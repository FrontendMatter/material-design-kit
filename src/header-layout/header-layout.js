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
    '_updateScroller(hasScrollingRegion)',
    '_updateContentPosition(hasScrollingRegion, header.fixed, header.condenses)',
    '_updateDocument(fullbleed)'
  ],

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'window._debounceResize(resize)'
  ],

  /**
   * The header layout content wrapper HTMLElement
   * @return {HTMLElement}
   */
  get contentContainer () {
    return this.element.querySelector('.mdk-header-layout__content')
  },

  /**
   * A reference to the header component
   * @return {Object}
   */
  get header () {
    const headerNode = this.element.querySelector('.mdk-header')
    if (headerNode) {
      return headerNode.mdkHeader
    }
  },

  _updateScroller () {
    this.header.scrollTargetSelector = this.hasScrollingRegion ? this.contentContainer : null
  },

  _updateContentPosition () {
    const headerHeight = this.header.element.offsetHeight
    const gutter = parseInt(window.getComputedStyle(this.header.element).marginBottom, 10)
    const containerStyle = this.contentContainer.style
    
    if (this.header.fixed || this.header.willCondense()) {
      containerStyle.paddingTop = `${ headerHeight + gutter }px`
      containerStyle.marginTop = ''
    }
  },

  /**
   * Handle the resize event every 50ms
   */
  _debounceResize () {
    clearTimeout(this._onResizeTimeout)
    if (this._resizeWidth !== window.innerWidth) {
      this._onResizeTimeout = setTimeout(() => {
        this._resizeWidth = window.innerWidth
        this._reset()
      }, 50)
    }
  },

  _updateDocument () {
    const docElements = [...document.querySelectorAll('html, body')]
    if (this.fullbleed) {
      docElements.forEach(el => {
        el.style.height = '100%'
      })
    }
  },

  _reset () {
    this._updateContentPosition()
  },

  /**
   * Initialize component
   */
  init () {
    this._resizeWidth = window.innerWidth
    this._updateDocument()
    this._updateScroller()
  },

  /**
   * Destroy component
   */
  destroy () {
    clearTimeout(this._onResizeTimeout)
  }
})

handler.register('mdk-header-layout', headerLayoutComponent)