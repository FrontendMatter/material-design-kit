import { transform } from '../util'
import { mediaQuery } from '../media-query'
import { handler } from 'dom-factory'

/**
 * A wrapper element that positions a Drawer and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const drawerLayoutComponent = (element) => ({
  
  // HTMLElement
  element,

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Ignore the `responsiveWidth` option and force the narrow layout on any screen size.
     * @type {Object}
     */
    forceNarrow: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Enable a push effect on the layout.
     * @type {Object}
     */
    push: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * The maximum viewport width for which the narrow layout is enabled.
     * @type {Object}
     */
    responsiveWidth: {
      reflectToAttribute: true,
      value: '554px'
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_resetLayout(narrow, forceNarrow)',
    '_onQueryMatches(mediaQuery.queryMatches)'
  ],
  
  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'drawer._onDrawerChange(mdk-drawer-change)'
  ],

  // The default `narrow` value
  _narrow: null,

  /**
   * The mediaQuery listener
   * @return {Object}
   */
  get mediaQuery () {
    if (!this._mediaQuery) {
      this._mediaQuery = mediaQuery(this.responsiveMediaQuery) 
    }
    return this._mediaQuery
  },

  /**
   * Returns true if the narrow layout is enabled.
   * @return {Boolean}
   */
  get narrow () {
    return this.forceNarrow ? true : this._narrow
  },

  /**
   * Toggle the narrow layout.
   * @param  {Boolean} value
   */
  set narrow (value) {
    this._narrow = !value && this.forceNarrow ? true : value
  },

  /**
   * The HTMLElement for the layout content
   * @return {HTMLElement}
   */
  get contentContainer () {
    return this.element.querySelector('.mdk-drawer-layout__content')
  },

  /**
   * The drawerComponent
   * @return {Object} A reference to the drawer component.
   */
  get drawer () {
    const drawerNode = this.element.querySelector(':scope > .mdk-drawer')
    if (drawerNode) {
      return drawerNode.mdkDrawer
    }
  },

  /**
   * Computed media query value passed to the mediaQuery listener
   * @return {String}
   */
  get responsiveMediaQuery () {
    return this.forceNarrow ? '(min-width: 0px)' : `(max-width: ${ this.responsiveWidth })`
  },

  _resetLayout () {
    this.drawer.opened = this.drawer.persistent = !this.narrow
    this._onDrawerChange()
  },

  _resetContent () {
    let drawer = this.drawer
    let drawerWidth = this.drawer.getWidth()
    let contentContainer = this.contentContainer

    if (!drawer.opened) {
      contentContainer.style.marginLeft = ''
      contentContainer.style.marginRight = ''
      return
    }

    if (drawer.position === 'right') {
      contentContainer.style.marginLeft = ''
      contentContainer.style.marginRight = `${ drawerWidth }px`
    }
    else {
      contentContainer.style.marginLeft = `${ drawerWidth }px`
      contentContainer.style.marginRight = ''
    }
  },

  _resetPush () {
    let drawer = this.drawer
    let drawerWidth = this.drawer.getWidth()
    let contentContainer = this.contentContainer

    if (!drawer.opened) {
      transform('translate3d(0, 0, 0)', contentContainer)

      contentContainer.style.marginLeft = ''
      contentContainer.style.marginRight = ''
      return
    }

    if (drawer.position === 'right') {
      transform(`translate3d(${ -1 * drawerWidth }px, 0, 0)`, contentContainer)

      if (!this.narrow) {
        contentContainer.style.marginLeft = `${ drawerWidth }px`
        contentContainer.style.marginRight = ''
      }
    }
    else {
      transform(`translate3d(${ drawerWidth }px, 0, 0)`, contentContainer)

      if (!this.narrow) {
        contentContainer.style.marginLeft = ''
        contentContainer.style.marginRight = `${ drawerWidth }px`
      }
    }
  },

  _setContentTransitionDuration (duration) {
    this.contentContainer.style.transitionDuration = duration
  },

  _onDrawerChange () {
    if (this.push) {
      return this._resetPush()
    }

    if (!this.narrow) {
      this._resetContent()
    }
  },

  _onQueryMatches (value) {
    this.narrow = value
  },

  /**
   * Initialize component
   */
  init () {
    // Initial render
    this._setContentTransitionDuration('0s')
    setTimeout(() => this._setContentTransitionDuration(''), 0)

    // Initialize mediaQuery
    this.mediaQuery.init()
  },

  /**
   * Destroy component
   */
  destroy () {
    this.mediaQuery.destroy()
  }
})

handler.register('mdk-drawer-layout', drawerLayoutComponent)