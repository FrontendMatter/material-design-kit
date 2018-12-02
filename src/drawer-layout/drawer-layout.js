import { mediaQuery } from '../media-query'
import { handler, util } from 'dom-factory'

/**
 * A wrapper element that positions a Drawer and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const drawerLayoutComponent = () => ({
  
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
     * The maximum viewport width for which the narrow layout is enabled.
     * @type {Object}
     */
    responsiveWidth: {
      reflectToAttribute: true,
      value: '554px'
    },

    /**
     * If true, defines it's own scrolling region, otherwise uses the document scroll.
     * @type {Object}
     */
    hasScrollingRegion: {
      type: Boolean,
      reflectToAttribute: true
    },

    fullbleed: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_resetLayout(narrow, forceNarrow)',
    '_onQueryMatches(mediaQuery.queryMatches)',
    '_updateScroller(hasScrollingRegion)',
    '_updateDocument(fullbleed)'
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

  // The mediaQuery listener
  _mediaQuery: null,

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
    let drawerNode
    try {
      drawerNode = Array.from(this.element.children).find(e => e.matches('.mdk-drawer'))
    } catch(e) {}
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

  _updateDocument () {
    const docElements = [...document.querySelectorAll('html, body')]
    if (this.fullbleed) {
      docElements.forEach(el => {
        el.style.height = '100%'
      })
    }
  },

  _updateScroller () {
    const docElements = [...document.querySelectorAll('html, body')]
    if (this.hasScrollingRegion) {
      docElements.forEach(el => {
        el.style.overflow = 'hidden'
        el.style.position = 'relative'
      })
    }
  },

  _resetLayout () {
    this.drawer.opened = this.drawer.persistent = !this.narrow
    this._onDrawerChange()
  },

  _resetPush () {
    let drawer = this.drawer
    let drawerWidth = this.drawer.getWidth()
    let contentContainer = this.contentContainer
    let isRTL = drawer._isRTL()

    if (drawer.opened) {
      util.transform('translate3d(0, 0, 0)', contentContainer)
      return
    }

    let transform = (this.element.offsetWidth - contentContainer.offsetWidth) / 2
    transform = drawer.position === 'right' ? transform : transform * -1

    util.transform(`translate3d(${ transform }px, 0, 0)`, contentContainer)
  },

  _setContentTransitionDuration (duration) {
    this.contentContainer.style.transitionDuration = duration
  },

  _onDrawerChange () {
    this._resetPush()
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

    this._updateDocument()
    this._updateScroller()

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