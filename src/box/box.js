import { scrollTargetBehavior } from '../scroll-target-behavior'
import { scrollEffectBehavior } from '../scroll-effect-behavior'
import { handler } from 'dom-factory'

// SCROLL EFFECTS
import { SCROLL_EFFECTS } from '../scroll-effects'

const MODULE = 'mdk-box'
const BG = `.${ MODULE }__bg`
const FRONT_LAYER = `${ BG }-front`
const REAR_LAYER = `${ BG }-rear`

/**
 * A container element for generic content with visual effects based on scroll position
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const boxComponent = (element) => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Disables effects
     */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Event listeners.
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

  // The current scroll progress
  _progress: 0,

  /**
   * Returns true if the element is visible in the current viewport.
   * @return {Boolean}
   */
  isOnScreen () {
    return this._elementTop < this._scrollTop + this._scrollTargetHeight && 
      this._elementTop + this.element.offsetHeight > this._scrollTop
  },

  isVisible () {
    return this.element.offsetWidth > 0 && this.element.offsetHeight > 0
  },

  /**
   * Returns an object containing the progress value of the scroll effects.
   * @return {Object}
   */
  getScrollState () {
    return {
      progress: this._progress
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

  _getElementTop () {
    let currentNode = this.element
    let top = 0

    while (currentNode && currentNode !== this.scrollTarget) {
      top += currentNode.offsetTop
      currentNode = currentNode.offsetParent
    }
    return top
  },

  /**
   * Updates the scroll state.
   * @param  {number} scrollTop
   */
  _updateScrollState (scrollTop) {
    if (this.disabled) {
      return
    }

    if (this.isOnScreen()) {
      let target = Math.min(this._scrollTargetHeight, this._elementTop + this.element.offsetHeight)
      let viewportTop = this._elementTop - scrollTop
      let progress = 1 - (viewportTop + this.element.offsetHeight) / target

      this._progress = progress
      this._runEffects(this._progress, scrollTop)
    }
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
    this._setupBackgrounds()
    
    SCROLL_EFFECTS.map(effect => this.registerEffect(effect.name, effect))
  },

  _reset () {
    this._elementTop = this._getElementTop()
    this._setUpEffects()
    this._updateScrollState(this._clampedScrollTop)
  },

  /**
   * Destroy component
   */
  destroy () {
    clearTimeout(this._onResizeTimeout)
    this.detachFromScrollTarget()
  }
})

handler.register(MODULE, boxComponent)