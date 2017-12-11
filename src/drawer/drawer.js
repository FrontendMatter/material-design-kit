import { handler } from 'dom-factory'

/**
 * A navigation drawer that can slide in from the left or right
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const drawerComponent = () => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {
    
    /**
     * The opened state of the drawer.
     * @type {Object}
     */
    opened: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * The drawer does not have a scrim.
     * @type {Object}
     */
    persistent: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * The alignment of the drawer on the screen ('left', 'right', 'start' or 'end').
     * 'start' computes to left and 'end' to right in LTR and RTL layouts.
     * @type {Object}
     */
    align: {
      reflectToAttribute: true,
      value: 'start'
    },

    /**
     * The computed drawer position on the screen ('left' or 'right').
     * @type {Object}
     */
    position: {
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_resetPosition(align)',
    '_fireChange(opened, persistent, align, position)',
    '_onChangedState(_drawerState)',
    '_onClose(opened)'
  ],

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    '_onTransitionend(transitionend)',
    'scrim._onClickScrim(click)'
  ],

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

  _onClose (opened) {
    if (!opened) {
      this.element.setAttribute('data-closing', true)
    }
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
      if (!this.opened) {
        this.element.removeAttribute('data-closing')
      }
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

  _fireChange () {
    this.fire('mdk-drawer-change')
  },

  _fireChanged () {
    this.fire('mdk-drawer-changed')
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
    this._resetPosition()
    this._setTransitionDuration('0s')

    setTimeout(() => {
      this._setTransitionDuration('')
      this._resetDrawerState()
    }, 0)
  }
})

handler.register('mdk-drawer', drawerComponent)