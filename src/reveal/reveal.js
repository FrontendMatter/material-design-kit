import { handler, util } from 'dom-factory'

/**
 * A content area that reveals on user interaction.
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const revealComponent = () => ({
  
  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Partially revealed size.
     * @type {Object}
     */
    partialHeight: {
      reflectToAttribute: true,
      type: Number,
      value: 0
    },

    /**
     * Always revealed.
     * @type {Object}
     */
    forceReveal: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Toggle reveal on click/mouseenter/mouseleave or touchstart/touchend.
     * click|hover
     * @type {Object}
     */
    trigger: {
      value: 'click',
      reflectToAttribute: true
    },

    /**
     * The opened state.
     * @type {Object}
     */
    opened: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_onChange(opened)'
  ],

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    '_onEnter(mouseenter, touchstart)',
    '_onLeave(mouseleave, touchend)',
    'window._debounceResize(resize)',
    '_onClick(click)',
  ],

  /**
   * Revealable element.
   * @return {HTMLElement}
   */
  get reveal () {
    return this.element.querySelector('.mdk-reveal__content')
  },

  /**
   * Partial mask element.
   * @return {HTMLElement}
   */
  get partial () {
    let partial = this.reveal.querySelector('.mdk-reveal__partial')
    if (!partial) {
      partial = document.createElement('DIV')
      partial.classList.add('mdk-reveal__partial')
      this.reveal.insertBefore(partial, this.reveal.childNodes[0])
    }
    return partial
  },

  /**
   * Open the revealable element.
   */
  open () {
    this.opened = true
  },

  /**
   * Close the revealable element.
   */
  close () {
    this.opened = false
  },

  /**
   * Toggle the opened state.
   */
  toggle () {
    this.opened = !this.opened
  },

  /**
   * Set the initial state.
   * Gets called automatically on `window.load`
   */
  _reset () {
    this._translate = 'translateY(' + (-1 * (this.reveal.offsetHeight - this.partialHeight)) + 'px)'
    
    if (this.partialHeight !== 0) {
      this.partial.style.height = this.partialHeight + 'px'
    }

    this.element.style.height = this.reveal.offsetTop + this.partialHeight + 'px'

    if (this.forceReveal && !this.opened) {
      this.open()
    }
  },

  _onChange () {
    util.transform(this.opened ? this._translate : 'translateY(0)', this.reveal)
  },

  /**
   * Handle `mouseenter` and `touchstart` events.
   * @param  {MouseEvent|TouchEvent} event
   */
  _onEnter () {
    if (this.trigger === 'hover' && !this.forceReveal) {
      this.open()
    }
  },

  /**
   * Handle `click` event.
   * @param  {MouseEvent|TouchEvent} event
   */
  _onClick () {
    if (this.trigger === 'click') {
      this.toggle()
    }
  },

  /**
   * Handle `mouseleave` and `touchend` events.
   * @param  {MouseEvent|TouchEvent} event
   */
  _onLeave () {
    if (this.trigger === 'hover' && !this.forceReveal) {
      this.close()
    }
  },

  /**
   * Debounce `window.resize` handler.
   */
  _debounceResize () {
    clearTimeout(this._debounceResizeTimer)
    this._debounceResizeTimer = setTimeout(() => {
      if (this._resizeWidth !== window.innerWidth) {
        this._resizeWidth = window.innerWidth
        this._reset()
      }
    }, 50)
  },

  /**
   * Initialize component.
   */
  init () {
    this._resizeWidth = window.innerWidth
  },

  /**
   * Destroy component.
   */
  destroy () {
    clearTimeout(this._debounceResizeTimer)
  }
})

handler.register('mdk-reveal', revealComponent)