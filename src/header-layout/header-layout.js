import { watch, unwatch } from 'watch-object'

/**
 * A wrapper element that positions a Header and other content.
 * @param  {HTMLElement} element
 * @param  {headerComponent} header
 * @return {Object}
 */
export const headerLayoutComponent = (element, header) => {
  let component = {

    // HTMLElement
    element,

    // headerComponent reference
    header,

    /**
     * If true, defines it's own scrolling region, otherwise uses the document scroll
     * @return {Boolean}
     */
    get hasScrollingRegion () {
      return this.element.hasAttribute('has-scrolling-region')
    },

    /**
     * Update `has-scrolling-region` attribute on `element`
     * @param  {Boolean}  value
     */
    set hasScrollingRegion (value) {
      this.element[value ? 'setAttribute' : 'removeAttribute']('has-scrolling-region', 'has-scrolling-region')
    },

    /**
     * The header layout content wrapper HTMLElement
     * @return {HTMLElement}
     */
    get contentContainer () {
      return this.element.querySelector(':scope > .mdk-header-layout__content')
    },

    _updateScroller () {
      this.header.scrollTargetSelector = this.hasScrollingRegion ? this.contentContainer : null
    },

    _updateContentPosition () {
      const headerHeight = this.header.element.offsetHeight
      let containerStyle = this.contentContainer.style
      
      if (this.header.fixed && !this.header.willCondense() && this.hasScrollingRegion) {
        containerStyle.marginTop = `${ headerHeight }px`
        containerStyle.paddingTop = ''
      }
      else {
        containerStyle.paddingTop = `${ headerHeight }px`
        containerStyle.marginTop = ''
      }
    },

    /**
     * Initialize component
     */
    init () {
      watch(this, 'hasScrollingRegion', this._updateScroller)
      watch(this, 'hasScrollingRegion', this._updateContentPosition)
      watch(this.header, ['fixed', 'condenses'], this._updateContentPosition)

      this._updateScroller()
      this._updateContentPosition()
    },

    /**
     * Destroy component
     */
    destroy () {
      unwatch(this, 'hasScrollingRegion', this._updateScroller)
      unwatch(this, 'hasScrollingRegion', this._updateContentPosition)
      unwatch(this.header, ['fixed', 'condenses'], this._updateContentPosition)
    }
  }

  // Bind watch handlers
  component._updateContentPosition = component._updateContentPosition.bind(component)

  // Initialize component
  component.init()

  return component
}