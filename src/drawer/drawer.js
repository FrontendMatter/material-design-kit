import { watch, unwatch } from 'watch-object'

/**
 * A navigation drawer that can slide in from the left or right
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const drawerComponent = (element) => {
  let component = {

    // HTMLElement
    element,

    // The default align value
    _align: 'left',

    // The current drawer state
    _drawerState: 0,

    // Possible drawer states
    _DRAWER_STATE: {
      INIT: 0,
      OPENED: 1,
      OPENED_PERSISTENT: 2,
      CLOSED: 3
    },

    /**
     * The opened state of the drawer.
     * @return {Boolean}
     */
    get opened () {
      return this.element.hasAttribute('opened')
    },

    /**
     * Toggle the opened state of the drawer.
     * @param  {Boolean} opened
     */
    set opened (opened) {
      this.element[opened ? 'setAttribute' : 'removeAttribute']('opened', 'opened')
    },

    /**
     * The drawer does not have a scrim.
     * @return {Boolean}
     */
    get persistent () {
      return this.element.hasAttribute('persistent')
    },

    /**
     * Toggle the drawer scrim.
     * @param  {Boolean} persistent
     */
    set persistent (persistent) {
      this.element[persistent ? 'setAttribute' : 'removeAttribute']('persistent', 'persistent')
    },

    /**
     * The alignment of the drawer on the screen ('left', 'right', 'start' or 'end').
     * 'start' computes to left and 'end' to right in LTR and RTL layouts.
     * @return {String}
     */
    get align () {
      if (this.element.hasAttribute('align')) {
        return this.element.getAttribute('align')
      }
      return this._align
    },

    /**
     * Set the drawer alignment on the screen
     * @param  {String} align
     */
    set align (align) {
      this.element.setAttribute('align', align)
    },

    /**
     * The computed drawer position on the screen ('left' or 'right')
     * @return {String}
     */
    get position () {
      return this.element.getAttribute('position')
    },

    /**
     * Update the position attribute on the drawer HTMLElement
     * @param  {String} position
     */
    set position (position) {
      this.element.setAttribute('position', position)
    },

    /**
     * The drawer content HTMLElement
     * @return {HTMLElement}
     */
    get contentContainer () {
      return this.element.querySelector('.mdk-drawer__content')
    },

    /**
     * The drawer scrim HTMLElement
     * @return {HTMLElement}
     */
    get scrim () {
      let scrim = this.element.querySelector('.mdk-drawer__scrim')
      if (!scrim) {
        scrim = document.createElement('DIV')
        this.element.insertBefore(scrim, this.element.childNodes[0])
        scrim.classList.add('mdk-drawer__scrim')
      }
      return scrim
    },

    /**
     * Get the width of the drawer.
     * @return {String}
     */
    getWidth () {
      return this.contentContainer.offsetWidth
    },

    /**
     * Toggles the drawer opened state.
     */
    toggle () {
      this.opened = !this.opened
    },

    /**
     * Closes the drawer.
     */
    close () {
      this.opened = false
    },

    /**
     * Opens the drawer.
     */
    open () {
      this.opened = true
    },

    _isRTL () {
      return window.getComputedStyle(this.element).direction === 'rtl'
    },

    _setTransitionDuration (duration) {
      this.contentContainer.style.transitionDuration = duration
      this.scrim.style.transitionDuration = duration
    },

    _resetDrawerState () {
      let oldState = this._drawerState
      if (this.opened) {
        this._drawerState = this.persistent 
          ? this._DRAWER_STATE.OPENED_PERSISTENT : this._DRAWER_STATE.OPENED
      }
      else {
        this._drawerState = this._DRAWER_STATE.CLOSED
      }

      if (oldState !== this._drawerState) {
        if (this._drawerState === this._DRAWER_STATE.OPENED) {
          document.body.style.overflow = 'hidden'
        }
        else {
          document.body.style.overflow = ''
        }
      }
    },

    _resetPosition () {
      switch (this.align) {
        case 'start':
          this.position = this._isRTL() ? 'right' : 'left'
          return
        case 'end':
          this.position = this._isRTL() ? 'left' : 'right'
          return
      }
      this.position = this.align
    },

    _fire (eventName) {
      let event = document.createEvent('Event')
      event.initEvent(eventName, true, true)
      this.element.dispatchEvent(event)
    },

    _fireChange () {
      this._fire('change.mdk.drawer')
    },

    _fireChanged () {
      this._fire('changed.mdk.drawer')
    },

    _onTransitionend (event) {
      let target = event.target
      if (target === this.contentContainer || target === this.scrim) {
        this._resetDrawerState()
      }
    },

    _onClickScrim (event) {
      event.preventDefault()
      this.close()
    },

    _onChangedState (newState, oldState) {
      if (oldState !== this._DRAWER_STATE.INIT) {
        this._fireChanged()
      }
    },

    /**
     * Initialize component
     */
    init () {
      watch(this, 'align', this._resetPosition)
      watch(this, ['opened', 'persistent', 'align', 'position'], this._fireChange)
      watch(this, '_drawerState', this._onChangedState)

      this.scrim.addEventListener('click', this._onClickScrim)

      this._setTransitionDuration('0s')
      setTimeout(() => {
        this._setTransitionDuration('')
        this._resetDrawerState()

        this.element.addEventListener('transitionend', this._onTransitionend)
      }, 0)
    },

    /**
     * Destroy component
     */
    destroy () {
      unwatch(this, 'align', this._resetPosition)
      unwatch(this, ['opened', 'persistent', 'align', 'position'], this._fireChange)
      unwatch(this, '_drawerState', this._onChangedState)

      this.scrim.removeEventListener('click', this._onClickScrim)
      this.element.removeEventListener('transitionend', this._onTransitionend)
    }
  }

  // Event handlers bindings
  component._onClickScrim = component._onClickScrim.bind(component)
  component._onTransitionend = component._onTransitionend.bind(component)

  // Initialize component
  component.init()

  return component
}