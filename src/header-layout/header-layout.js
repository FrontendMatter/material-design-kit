import { handler } from 'dom-factory'

/**
 * A wrapper element that positions a Header and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const headerLayoutComponent = () => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * If true, defines it's own scrolling region, otherwise uses the document scroll.
     * @type {Object}
     */
    hasScrollingRegion: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_updateScroller(hasScrollingRegion)',
    '_updateContentPosition(hasScrollingRegion, header.fixed, header.condenses)'
  ],

  /**
   * The header layout content wrapper HTMLElement
   * @return {HTMLElement}
   */
  get contentContainer () {
    return this.element.querySelector(':scope > .mdk-header-layout__content')
  },

  /**
   * A reference to the header component
   * @return {Object}
   */
  get header () {
    const headerNode = this.element.querySelector(':scope > .mdk-header')
    if (headerNode) {
      return headerNode.mdkHeader
    }
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
    this._updateScroller()
    this._updateContentPosition()
  }
})

handler.register('mdk-header-layout', headerLayoutComponent)