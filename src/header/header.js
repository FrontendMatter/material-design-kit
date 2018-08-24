import { scrollTargetBehavior } from '../scroll-target-behavior'
import { scrollEffectBehavior } from '../scroll-effect-behavior'
import { handler } from 'dom-factory'

import { RetargetMouseScroll } from 'retarget-mouse-scroll'

// SCROLL EFFECTS
import { SCROLL_EFFECTS } from '../scroll-effects'

// HEADER SCROLL EFFECTS
import { HEADER_SCROLL_EFFECTS } from '../header-scroll-effects'

const MODULE = 'mdk-header'
const CONTENT = `.${ MODULE }__content`
const BG = `.${ MODULE }__bg`
const FRONT_LAYER = `${ BG }-front`
const REAR_LAYER = `${ BG }-rear`
const MODIFIER_FIXED = `${ MODULE }--fixed`

/**
 * A container element for navigation and other content at the top 
 * of the screen with visual effects based on scroll position
 * 
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const headerComponent = (element) => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Collapse the header when scrolling down, leaving only the `[primary]` element visible.
     * If there is no `[primary]` element, the first child remains visibile.
     * @type {Object}
     */
    condenses: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Slides back the header when scrolling back up.
     * @type {Object}
     */
    reveals: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Mantains the header fixed at the top.
     * @type {Object}
     */
    fixed: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Disables all scroll effects.
     * @type {Object}
     */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_handleFixedPositionedScroll(scrollTarget)',
    '_reset(condenses, reveals, fixed)'
  ],

  /**
   * Event listeners
   * @type {Array}
   */
  listeners: [
    'window._debounceResize(resize)'
  ],

  /**
   * Compose mixins
   * @type {Array}
   */
  mixins: [
    scrollTargetBehavior(element),
    scrollEffectBehavior(element)
  ],

  // A cached offsetHeight of the element
  _height: 0,

  // The distance in pixels the header will be translated to when scrolling
  _dHeight: 0,

  // The offsetTop of `_primary`
  _primaryTop: 0,

  // The element that remains visibile when the header condenses
  _primary: null,

  // The header's top value used for the `transformY`
  _top: 0,

  // The current scroll progress
  _progress: 0,

  _wasScrollingDown: false,
  _initScrollTop: 0,
  _initTimestamp: 0,
  _lastTimestamp: 0,
  _lastScrollTop: 0,

  /**
   * Disables transform effects
   * @return {Boolean}
   */
  get transformDisabled () {
    return this.disabled || this.element.dataset.transformDisabled || !this._isPositionedFixedEmulated || !this.willCondense()
  },

  /**
   * Update `transform-disabled` attribute on `element`
   * @param  {Boolean}  value
   */
  set transformDisabled (value) {
    this.element[value ? 'setAttribute' : 'removeAttribute']('data-transform-disabled', 'data-transform-disabled')
  },

  /**
   * The distance the header is allowed to move away.
   * @return {number}
   */
  get _maxHeaderTop () {
    return this.fixed ? this._dHeight : this._height + 5
  },

  get _isPositionedFixedEmulated () {
    return this.fixed || this.condenses || this.reveals
  },

  get _isPositionedAbsolute () {
    return window.getComputedStyle(this.element).position === 'absolute'
  },

  get _primaryisPositionedFixed () {
    return window.getComputedStyle(this._primary).position === 'fixed'
  },

  /**
   * Returns true if the header will condense based on the size of the header
   * @return {Boolean}
   */
  willCondense () {
    return this._dHeight > 0 && this.condenses
  },

  /**
   * Returns true if the element is visible in the current viewport.
   * @return {Boolean}
   */
  isOnScreen () {
    return this._height !== 0 && this._top < this._height
  },

  /**
   * Returns true if there's content below the element.
   * @return {Boolean}
   */
  isContentBelow () {
    if (this._top === 0) {
      return this._clampedScrollTop > 0
    }
    return this._clampedScrollTop - this._maxHeaderTop >= 0
  },

  /**
   * Returns an object containing the progress value of the scroll
   * and the top position of the header.
   * @return {Object}
   */
  getScrollState () {
    return {
      progress: this._progress,
      top: this._top
    }
  },

  _setupBackgrounds () {
    let bgNode = this.element.querySelector(BG)
    if (!bgNode) {
      bgNode = document.createElement('DIV')
      this.element.insertBefore(bgNode, this.element.childNodes[0])
      bgNode.classList.add(BG.substr(1))
    }

    [FRONT_LAYER, REAR_LAYER].map(className => {
      let bgNodeLayer = bgNode.querySelector(className)
      if (!bgNodeLayer) {
        bgNodeLayer = document.createElement('DIV')
        bgNode.appendChild(bgNodeLayer)
        bgNodeLayer.classList.add(className.substr(1))
      }
    })
  },

  _reset () {
    if (this.element.offsetWidth === 0 && this.element.offsetHeight === 0) {
      return
    }

    if (this._primaryisPositionedFixed) {
      this.element.style.paddingTop = this._primary.offsetHeight + 'px'
    }

    let scrollTop = this._clampedScrollTop
    let firstSetup = this._height === 0 || scrollTop === 0

    this._height = this.element.offsetHeight
    this._primaryTop = this._primary ? this._primary.offsetTop : 0
    this._dHeight = 0
    
    if (this._mayMove()) {
      this._dHeight = this._primary ? this._height - this._primary.offsetHeight : 0
    }
    
    this._setUpEffects()
    this._updateScrollState(firstSetup ? scrollTop : this._lastScrollTop, true)
  },

  /**
   * Pass MouseWheel events from the scroll target
   * when the header is fixed and the scroll target is not the document
   */
  _handleFixedPositionedScroll () {
    if (this._fixedPositionedScrollHandler !== undefined) {
      this._fixedPositionedScrollHandler.restore()
    }
    if (this._isValidScrollTarget() && this._isPositionedFixedEmulated && this.scrollTarget !== this._doc) {
      this._fixedPositionedScrollHandler = RetargetMouseScroll(this.element, this.scrollTarget)
    }
  },

  /**
   * Returns a reference to the element that remains visible when the header condenses.
   * @return {HTMLElement}
   */
  get _primary () {
    if (this._primaryElement) {
      return this._primaryElement
    }

    let primary
    let nodes = this.element.querySelector(CONTENT).children

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        let node = nodes[i]
        if (node.dataset.primary !== undefined) {
          primary = node
          break
        }
        else if (!primary) {
          primary = node
        }
      }
    }

    this._primaryElement = primary
    return this._primaryElement
  },

  /**
   * Updates the scroll state.
   * @param  {number} scrollTop
   * @param  {Boolean} forceUpdate
   */
  _updateScrollState (scrollTop, forceUpdate) {
    if (this._height === 0 || this.disabled) {
      return
    }

    if (!forceUpdate && scrollTop === this._lastScrollTop) {
      return
    }

    let progress = 0
    let top = 0
    let lastTop = this._top
    let maxHeaderTop = this._maxHeaderTop
    let dScrollTop = scrollTop - this._lastScrollTop
    let absDScrollTop = Math.abs(dScrollTop)
    let isScrollingDown = scrollTop > this._lastScrollTop
    let now = Date.now()

    if (this._mayMove()) {
      top = this._clamp(this.reveals ? lastTop + dScrollTop : scrollTop, 0, maxHeaderTop)
    }

    if (scrollTop >= this._dHeight) {
      top = this.condenses ? Math.max(this._dHeight, top) : top
    }

    if (this.reveals && absDScrollTop < 100) {
      if (now - this._initTimestamp > 300 || this._wasScrollingDown !== isScrollingDown) {
        this._initScrollTop = scrollTop
        this._initTimestamp = now
      }
      if (scrollTop >= maxHeaderTop) {
        if (Math.abs(this._initScrollTop - scrollTop) > 30 || absDScrollTop > 10) {
          if (isScrollingDown && scrollTop >= maxHeaderTop) {
            top = maxHeaderTop
          }
          else if (!isScrollingDown && scrollTop >= this._dHeight) {
            top = this.condenses ? this._dHeight : 0
          }

          let scrollVelocity = dScrollTop / (now - this._lastTimestamp)
          this._revealTransitionDuration = this._clamp((top - lastTop) / scrollVelocity, 0, 300)
        }
        else {
          top = this._top
        }
      }
    }

    if (this._dHeight === 0) {
      progress = scrollTop > 0 ? 1 : 0
    }
    else {
      progress = top / this._dHeight
    }

    if (!forceUpdate) {
      this._lastScrollTop = scrollTop
      this._top = top
      this._wasScrollingDown = isScrollingDown
      this._lastTimestamp = now
    }

    if (forceUpdate || progress !== this._progress || lastTop !== top || scrollTop === 0) {
      this._progress = progress
      this._runEffects(progress, top)
      this._transformHeader(top)
    }
  },

  /**
   * Transforms the header.
   * @param  {number} top
   */
  _transformHeader (top) {
    if (this.transformDisabled) {
      return
    }

    if (this._isPositionedAbsolute) {
      let transform = top
      if (this.scrollTarget === this._doc) {
        transform = 0
      }

      if (top === transform) {
        this.element.style.willChange = 'transform'
        this._transform(`translate3d(0, ${ transform * -1 }px, 0)`)
      }

      if (top >= this._primaryTop) {
        this._primary.style.willChange = 'transform'
        this._transform(`translate3d(0, ${ Math.min(top, this._dHeight) - this._primaryTop }px, 0)`, this._primary)
      }
      return
    }

    if (this.fixed && this._isPositionedFixed) {
      let transform = top

      this.element.style.willChange = 'transform'
      this._transform(`translate3d(0, ${ transform * -1 }px, 0)`)

      if (top >= this._primaryTop) {
        this._primary.style.willChange = 'transform'
        this._transform(`translate3d(0, ${ Math.min(top, this._dHeight) - this._primaryTop }px, 0)`, this._primary)
      }
      return
    }

    let transform = 0
    let duration = `${ this._revealTransitionDuration }ms`

    if (top > this._dHeight) {
      transform = -1 * (top - this._dHeight)

      if (this.reveals) {
        duration = '0ms'
      }
    }
    if (this.reveals) {
      this._primary.style.transitionDuration = duration
    }
    this._primary.style.willChange = 'transform'
    this._transform(`translate3d(0, ${ transform }px, 0)`, this._primary)
  },

  _clamp (v, min, max) {
    return Math.min(max, Math.max(min, v))
  },

  /**
   * Returns true if the current header is allowed to move as the user scrolls.
   * @return {Boolean}
   */
  _mayMove () {
    return this.condenses || !this.fixed
  },

  /**
   * Handle the resize event every 50ms
   */
  _debounceResize () {
    clearTimeout(this._onResizeTimeout)
    if (this._resizeWidth !== window.innerWidth) {
      this._onResizeTimeout = setTimeout(() => {
        this._resizeWidth = window.innerWidth
        this._reset()
      }, 50)
    }
  },

  /**
   * Initialize component
   */
  init () {
    this._resizeWidth = window.innerWidth

    this.attachToScrollTarget()
    this._handleFixedPositionedScroll()
    this._setupBackgrounds()

    this._primary.setAttribute('data-primary', 'data-primary')
    this._primary.classList[(this.fixed || this.condenses) ? 'add' : 'remove'](MODIFIER_FIXED)

    SCROLL_EFFECTS.concat(HEADER_SCROLL_EFFECTS).map(effect => this.registerEffect(effect.name, effect))
  },

  /**
   * Destroy component
   */
  destroy () {
    clearTimeout(this._onResizeTimeout)
    this.detachFromScrollTarget()
  }
})

handler.register(MODULE, headerComponent)