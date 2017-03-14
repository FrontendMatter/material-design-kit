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
    '_updateDocument(fullbleed)',
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
    const drawerNode = this.element.querySelector('.mdk-drawer')
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

    const child = this.element.querySelector('.mdk-drawer-layout')
    if (child) {
      child.style.paddingBottom = child.offsetTop + 'px'
    }
  },

  _resetContent () {
    let drawer = this.drawer
    let drawerWidth = this.drawer.getWidth()
    let contentContainer = this.contentContainer
    let isRTL = drawer._isRTL()

    if (!drawer.opened) {
      contentContainer.style.marginLeft = ''
      contentContainer.style.marginRight = ''
      return
    }

    if (drawer.position === 'right' || (!drawer.position && isRTL)) {
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
    let isRTL = drawer._isRTL()

    if (!drawer.opened) {
      util.transform('translate3d(0, 0, 0)', contentContainer)

      contentContainer.style.marginLeft = ''
      contentContainer.style.marginRight = ''
      return
    }

    if (drawer.position === 'right' || (!drawer.position && isRTL)) {
      util.transform(`translate3d(${ -1 * drawerWidth }px, 0, 0)`, contentContainer)

      if (!this.narrow) {
        contentContainer.style.marginLeft = `${ drawerWidth }px`
        contentContainer.style.marginRight = ''
      }
    }
    else {
      util.transform(`translate3d(${ drawerWidth }px, 0, 0)`, contentContainer)

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

    this._resetContent()
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