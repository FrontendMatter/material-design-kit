import { transform } from '../util'
import { mediaQuery } from '../media-query'
import { watch, unwatch } from 'watch-object'

/**
 * A wrapper element that positions a Drawer and other content.
 * @param  {HTMLElement} element
 * @param  {drawerComponent} drawer
 * @return {Object}
 */
export const drawerLayoutComponent = (element, drawer) => {
  let component = {

    // HTMLElement
    element,

    // drawerComponent
    drawer,

    // mediaQuery utility
    _mediaQuery: null,

    // The default maximum viewport width for the narrow layout
    _responsiveWidth: '554px',

    // The default `narrow` value
    _narrow: null,

    /**
     * The mediaQuery listener
     * @return {Object}
     */
    get mediaQuery () {
      if (this._mediaQuery) {
        return this._mediaQuery
      }
      this._mediaQuery = mediaQuery(this.responsiveMediaQuery)
      return this._mediaQuery
    },

    /**
     * If true, ignore the `responsiveWidth` option and force the narrow layout on any screen size.
     * @return {Boolean}
     */
    get forceNarrow () {
      return this.element.hasAttribute('force-narrow')
    },

    /**
     * Update `force-narrow` attribute on `element`
     * @param  {Boolean}  value
     */
    set forceNarrow (value) {
      this.element[value ? 'setAttribute' : 'removeAttribute']('force-narrow', 'force-narrow')
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
     * Returns true if the layout has the push effect enabled.
     * @return {Boolean}
     */
    get push () {
      return this.element.hasAttribute('push')
    },

    /**
     * The maximum width for auto changing to narrow layout.
     * @return {String}
     */
    get responsiveWidth () {
      if (this.element.hasAttribute('responsive-width')) {
        return this.element.getAttribute('responsive-width')
      }
      return this._responsiveWidth
    },

    /**
     * The HTMLElement for the layout content
     * @return {HTMLElement}
     */
    get contentContainer () {
      return this.element.querySelector('.mdk-drawer-layout__content')
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

      // Reactivity
      watch(this, ['narrow', 'forceNarrow'], this._resetLayout)
      watch(this.mediaQuery, 'queryMatches', this._onQueryMatches)
      
      // Initialize media query
      this.mediaQuery.resetMediaQuery()

      // Drawer change
      this.drawer.element.addEventListener('change.mdk.drawer', this._onDrawerChange)
    },

    /**
     * Destroy component
     */
    destroy () {
      unwatch(this, ['narrow', 'forceNarrow'], this._resetLayout)
      unwatch(this.mediaQuery, 'queryMatches', this._onQueryMatches)

      this.drawer.element.removeEventListener('change.mdk.drawer', this._onDrawerChange)
    }
  }

  // Watch handlers bindings
  component._onQueryMatches = component._onQueryMatches.bind(component)

  // Event handlers bindings
  component._onDrawerChange = component._onDrawerChange.bind(component)

  // Initialize component
  component.init()

  return component
}