import { watch, unwatch } from 'watch-object'

/**
 * Allows an element to respond to scroll events from a designated scroll target.
 * Use from a consumer via dom-factory mixins i.e. 
 * 
 * import { scrollTargetBehavior } from 'material-design-kit'
 * const anotherComponent = () => ({
 *   mixins: [ scrollTargetBehavior ]
 * })
 * 
 * @param  {HTMLElement} element The element which should respond to scroll events
 * @return {Object}
 */
export const scrollTargetBehavior = () => ({

  // The scroll target selector
  _scrollTargetSelector: null,

  // The scroll target HTMLElement
  _scrollTarget: null,
  
  /**
   * Get the HTMLELement of the scroll target
   * @return {HTMLElement}
   */
  get scrollTarget () {
    if (this._scrollTarget) {
      return this._scrollTarget
    }
    return this._defaultScrollTarget
  },

  /**
   * Set the HTMLElement of the scroll target
   * @param  {HTMLElement} value
   */
  set scrollTarget (value) {
    this._scrollTarget = value
  },

  /**
   * Get the scroll target selector
   * @return {String|HTMLElement}
   */
  get scrollTargetSelector () {
    if (this._scrollTargetSelector) {
      return this._scrollTargetSelector
    }
    if (this.element.hasAttribute('data-scroll-target')) {
      return this.element.getAttribute('data-scroll-target')
    }
  },

  /**
   * Set the scroll target selector
   * @param  {String|HTMLElement} value
   */
  set scrollTargetSelector (value) {
    this._scrollTargetSelector = value
  },

  /**
   * Get the default scroll target
   * @return {HTMLElement}
   */
  get _defaultScrollTarget () {
    return this._doc
  },

  /**
   * Get the ownerDocument
   * @return {HTMLElement}
   */
  get _owner () {
    return this.element.ownerDocument
  },

  /**
   * Get the document element
   * @return {HTMLElement}
   */
  get _doc () {
    return this._owner.documentElement
  },

  /**
   * Gets the number of pixels that the content of an element is scrolled upward.
   * @return {number}
   */
  get _scrollTop () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.pageYOffset : this.scrollTarget.scrollTop
    }
    return 0
  },

  /**
   * Sets the number of pixels that the content of an element is scrolled upward.
   * @param  {number} top
   */
  set _scrollTop (top) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(window.pageXOffset, top)
    }
    else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollTop = top
    }
  },

  /**
   * Gets the number of pixels that the content of an element is scrolled to the left.
   * @return {number}
   */
  get _scrollLeft () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.pageXOffset : this.scrollTarget.scrollLeft
    }
    return 0
  },

  /**
   * Sets the number of pixels that the content of an element is scrolled to the left.
   * @param  {number} left
   */
  set _scrollLeft (left) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(left, window.pageYOffset)
    }
    else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollLeft = left
    }
  },

  /**
   * Gets the width of the scroll target.
   * @return {number}
   */
  get _scrollTargetWidth () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.innerWidth : this.scrollTarget.offsetWidth
    }
    return 0
  },

  /**
   * Gets the height of the scroll target.
   * @return {number}
   */
  get _scrollTargetHeight () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.innerHeight : this.scrollTarget.offsetHeight
    }
    return 0
  },

  get _isPositionedFixed () {
    if (this.element instanceof HTMLElement) {
      return window.getComputedStyle(this.element).position === 'fixed'
    }
    return false
  },

  /**
   * Attach the scroll event listener to the scroll target
   * @param  {string|HTMLElement} scrollTarget The scroll target (optional)
   */
  attachToScrollTarget () {
    this.detachFromScrollTarget()
    watch(this, 'scrollTargetSelector', this.attachToScrollTarget)
    
    if (this.scrollTargetSelector === 'document') {
      this.scrollTarget = this._doc
    }
    else if (typeof this.scrollTargetSelector === 'string') {
      this.scrollTarget = document.querySelector(`${ this.scrollTargetSelector }`)
    }
    else if (this.scrollTargetSelector instanceof HTMLElement) {
      this.scrollTarget = this.scrollTargetSelector
    }

    if (!this._doc.style.overflow) {
      this._doc.style.overflow = this.scrollTarget !== this._doc ? 'hidden' : ''
    }

    if (this.scrollTarget) {
      this.eventTarget = this.scrollTarget === this._doc ? window : this.scrollTarget
      this._boundScrollHandler = this._boundScrollHandler || this._scrollHandler.bind(this)
      this._loop()
      // this.eventTarget.addEventListener('scroll', this._boundScrollHandler)
    }
  },

  _loop () {
    requestAnimationFrame(this._boundScrollHandler)
  },

  /**
   * Detach the scroll event listener from the scroll target
   * @return {[type]} [description]
   */
  detachFromScrollTarget () {
    unwatch(this, 'scrollTargetSelector', this.attachToScrollTarget)
    // if (this.eventTarget) {
    //   this.eventTarget.removeEventListener('scroll', this._boundScrollHandler)
    // }
  },

  /**
   * Scrolls the content to a particular place.
   * @param  {number} left The left position
   * @param  {number} top  The top position
   */
  scroll (left = 0, top = 0) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(left, top)
    }
    else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollLeft = left
      this.scrollTarget.scrollTop = top
    }
  },

  /**
   * Scrolls the content to a particular place using a behavior.
   * @param  {Number} left     The left position
   * @param  {Number} top      The top position
   * @param  {String} behavior The behavior name
   * @param  {Function} scrollFn Custom scroll timing function used with `behavior` (optional)
   */
  scrollWithBehavior (left = 0, top = 0, behavior, scrollFn) {

    // Scroll timing function used with `behavior`
    scrollFn = typeof scrollFn === 'function' ? scrollFn : function easeOutQuad (t, b, c, d) {
      t /= d
      return -c * t * (t - 2) + b
    }
    
    // Smooth
    if (behavior === 'smooth') {
      let startTime = Date.now()
      let currentScrollTop = this._scrollTop
      let currentScrollLeft = this._scrollLeft
      let dScrollTop = top - currentScrollTop
      let dScrollLeft = left - currentScrollLeft
      let duration = 300;

      (function updateFrame () {
        let now = Date.now()
        let elapsedTime = now - startTime

        if (elapsedTime < duration) {
          this.scroll(
            scrollFn(elapsedTime, currentScrollLeft, dScrollLeft, duration),
            scrollFn(elapsedTime, currentScrollTop, dScrollTop, duration)
          )
          requestAnimationFrame(updateFrame.bind(this))
        }
      }).call(this)
    }

    // Default
    else {
      this.scroll(left, top)
    }
  },

  /**
   * Returns true if the scroll target is a valid HTMLElement.
   * @return {Boolean}
   */
  _isValidScrollTarget () {
    return this.scrollTarget instanceof HTMLElement
  },

  /**
   * Scroll event handler (runs on every scroll event)
   */
  _scrollHandler () {}
})