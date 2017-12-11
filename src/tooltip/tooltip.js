import { handler } from 'dom-factory'
import { scrollTargetBehavior } from '../scroll-target-behavior'

/**
 * @param  {HTMLElement} element
 * @return {Object}
 */
export const tooltipComponent = (element) => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Attaches the tooltip to an element.
     * @type {Object}
     */
    for: {
      readOnly: true,
      value () {
        var target = this.element.getAttribute('data-for')
        return document.querySelector('#' + target)
      }
    },

    position: {
      reflectToAttribute: true,
      value: 'bottom'
    },

    opened: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'for.show(mouseenter, touchstart)',
    'for.hide(mouseleave, touchend)',
    'window._debounceResize(resize)'
  ],

  observers: [
    '_reset(position)'
  ],

  mixins: [
    scrollTargetBehavior(element)
  ],

  /**
   * A reference to the drawer layout.
   * @return {Object}
   */
  get drawerLayout () {
    const layoutNode = document.querySelector('.mdk-js-drawer-layout')
    if (layoutNode) {
      return layoutNode.mdkDrawerLayout
    }
  },

  _reset () {
    this.element.removeAttribute('style')

    var props = this.for.getBoundingClientRect()
    var left = props.left + (props.width / 2)
    var top = props.top + (props.height / 2)
    var marginLeft = -1 * (this.element.offsetWidth / 2)
    var marginTop = -1 * (this.element.offsetHeight / 2)

    if (this.position === 'left' || this.position === 'right') {
      if (top + marginTop < 0) {
        this.element.style.top = '0'
        this.element.style.marginTop = '0'
      } 
      else {
        this.element.style.top = top + 'px'
        this.element.style.marginTop = marginTop + 'px'
      }
    }
    else if (left + marginLeft < 0) {
      this.element.style.left = '0'
      this.element.style.marginLeft = '0'
    } 
    else {
      this.element.style.left = left + 'px'
      this.element.style.marginLeft = marginLeft + 'px'
    }

    if (this.position === 'top') {
      this.element.style.top = props.top - this.element.offsetHeight - 10 + 'px'
    } 
    else if (this.position === 'right') {
      this.element.style.left = props.left + props.width + 10 + 'px'
    } 
    else if (this.position === 'left') {
      this.element.style.left = props.left - this.element.offsetWidth - 10 + 'px'
    } 
    else {
      this.element.style.top = props.top + props.height + 10 + 'px'
    }
  },

  _debounceResize () {
    clearTimeout(this._debounceResizeTimer)
    this._debounceResizeTimer = setTimeout(() => {
      if (window.innerWidth !== this._debounceResizeWidth) {
        this._debounceResizeWidth = window.innerWidth
        this._reset()
      }
    }, 50)
  },

  /**
   * Overrides `scrollTargetBehavior._scrollHandler`
   */
  _scrollHandler () {
    clearTimeout(this._debounceScrollTimer)
    this._debounceScrollTimer = setTimeout(this._reset.bind(this), 50)
  },

  show () {
    // this.element.style.transform = 'scale(1)'
    this.opened = true
  },

  hide () {
    // this.element.style.transform = 'scale(0)'
    this.opened = false
  },

  toggle () {
    this.opened = !this.opened
  },

  /**
   * Initialize component.
   */
  init () {
    document.body.appendChild(this.element)
    this._debounceResizeWidth = window.innerWidth

    this.attachToScrollTarget()
    this._reset()

    if (this.drawerLayout && this.drawerLayout.hasScrollingRegion) {
      this.scrollTargetSelector = this.drawerLayout.contentContainer
    }
  },

  /**
   * Destroy component.
   */
  destroy () {
    clearTimeout(this._debounceResizeTimer)
    clearTimeout(this._debounceScrollTimer)

    this.detachFromScrollTarget()
  }
})

handler.register('mdk-tooltip', tooltipComponent)