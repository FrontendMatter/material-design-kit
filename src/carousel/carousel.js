import { handler, util } from 'dom-factory'

const isTouch = () => ('ontouchstart' in window)

const matrixValues = (matrix) => {
  if (matrix === 'none') {
    matrix = 'matrix(0,0,0,0,0)'
  }
  var obj = {}
  var values = matrix.match(/([-+]?[\d\.]+)/g)
  obj.translate = {
    x: parseInt(values[4], 10) || 0,
    y: parseInt(values[5], 10) || 0
  }
  return obj
}

const transformMatrix = (el) => {
  var st = window.getComputedStyle(el, null)
  var matrix = st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform')

  return matrixValues(matrix)
}

/**
 * Compute the pointer coordinates from multiple event types.
 * @param  {TouchEvent|MouseEvent} event
 */
const pointer = (event) => {
  event = event.originalEvent || event || window.event
  event = event.touches && event.touches.length 
    ? event.touches[0] 
    : event.changedTouches && event.changedTouches.length
      ? event.changedTouches[0] 
      : event

  return {
    x: event.pageX ? event.pageX : event.clientX,
    y: event.pageY ? event.pageY : event.clientY
  }
}

/**
 * Compute the difference between the properties of two objects.
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
const difference = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  }
}

/**
 * A Carousel component for cycling through elements.
 * @param  {HTMLELement} element
 * @return {Object}
 */
export const carouselComponent = () => ({

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    '_onEnter(mouseenter)',
    '_onLeave(mouseleave)',
    '_onTransitionend(transitionend)',
    '_onDragStart(mousedown, touchstart)',
    '_onMouseDrag(dragstart, selectstart)',
    'document._onDragMove(mousemove, touchmove)',
    'document._onDragEnd(mouseup, touchend)',
    'window._debounceResize(resize)'
  ],

  // The carousel items
  _items: [],

  // The carousel moving state
  _isMoving: false,

  // A reference to the carousel content container
  _content: null,

  // A reference to the active item
  _current: null,

  // Drag and touch state
  _drag: {},

  /**
   * Set the initial state. 
   * Gets called automatically on `window.load`.
   */
  _reset () {
    this._content = this.element.querySelector('.mdk-carousel__content')
    this._items = [...this._content.children]

    this._content.style.width = ''
    this._items.forEach(function (item) {
      item.style.width = ''
    })

    var width = this.element.offsetWidth
    var itemWidth = this._items[0].offsetWidth
    var visible = width / itemWidth
    
    this._itemWidth = itemWidth
    this._visible = Math.round(visible)
    this._max = this._items.length - this._visible

    this.element.style.overflow = 'hidden'
    this._content.style.width = (itemWidth * this._items.length) + 'px'
    
    this._items.forEach(function (item) {
      item.classList.add('mdk-carousel__item')
      item.style.width = itemWidth + 'px'
    })

    if (!this._current) {
      this._current = this._items[0]
    }

    if (this._items.length < 2) {
      return
    }

    var currentIndex = this._items.indexOf(this._current)

    this._transform(currentIndex * itemWidth * -1, 0)

    this.start()
  },

  /**
   * Start sliding the carousel on a time interval.
   */
  start () {
    this.stop()

    if (this._items.length < 2 || this._items.length <= this._visible) {
      return
    }
    this._setContentTransitionDuration('')
    this._interval = setInterval(this.next.bind(this), 2000)
  },

  /**
   * Stop sliding the carousel on a time interval.
   */
  stop () {
    clearInterval(this._interval)
    this._interval = null
  },

  /**
   * Move the carousel forward by one item.
   */
  next () {
    if (this._items.length < 2 || this._isMoving || document.hidden || !this._isOnScreen()) {
      return
    }

    var currentIndex = this._items.indexOf(this._current)
    var nextIndex = this._items[currentIndex + 1] !== undefined 
      ? currentIndex + 1 : 0
    var remaining = this._items.length - currentIndex

    if (remaining === this._visible) {
      nextIndex = 0
    }

    this._to(nextIndex)
  },

  /**
   * Move the carousel backward by one item.
   */
  prev () {
    if (this._items.length < 2 || this._isMoving) {
      return
    }

    var currentIndex = this._items.indexOf(this._current)
    var prevIndex = this._items[currentIndex - 1] !== undefined 
      ? currentIndex - 1 : this._items.length
    this._to(prevIndex)
  },

  _transform (translate, duration, callback) {
    if (duration !== undefined) {
      this._setContentTransitionDuration(duration + 'ms')
    }
    var matrix = transformMatrix(this._content)
    if (matrix.translate.x === translate) {
      if (typeof callback === 'function') {
        callback.call(this)
      }
    }
    else {
      requestAnimationFrame(function () {
        if (duration !== 0) {
          this._isMoving = true
        }
        util.transform('translate3d(' + translate + 'px, 0, 0)', this._content)

        if (typeof callback === 'function') {
          callback.call(this)
        }
      }.bind(this))
    }
  },

  /**
   * Slide to a specific item by index.
   * @param  {Number} index
   */
  _to (index) {
    if (this._items.length < 2 || this._isMoving) {
      return
    }

    if (index > this._max) {
      index = this._max
    }
    if (index < 0) {
      index = 0
    }

    var translate = index * this._itemWidth * -1

    this._transform(translate, false, function () {
      this._current = this._items[index]
    })
  },

  /**
   * `window.resize` debounce handler.
   */
  _debounceResize () {
    clearTimeout(this._resizeTimer)
    if (this._resizeWidth !== window.innerWidth) {
      this._resizeTimer = setTimeout(function () {
        this._resizeWidth = window.innerWidth
        this.stop()
        this._reset()
      }.bind(this), 50)
    }
  },

  _setContentTransitionDuration (duration) {
    this._content.style.transitionDuration = duration
  },

  /**
   * Stop the carousel auto sliding on `mouseenter`.
   */
  _onEnter () {
    this.stop()
  },

  /**
   * (Re)start the carousel auto sliding on `mouseleave`.
   */
  _onLeave () {
    if (!this._drag.wasDragging) {
      this.start()
    }
  },

  /**
   * Handle `transitionend` events
   * @param  {TransitionEvent} event
   */
  _onTransitionend () {
    this._isMoving = false
  },

  /**
   * Handle `mousedown` and `touchstart` events
   * @param  {MouseEvent|TouchEvent} event
   */
  _onDragStart (event) {
    if (this._drag.isDragging || this._isMoving || event.which === 3) {
      return
    }

    this.stop()
    var stage = transformMatrix(this._content).translate

    this._drag.isDragging = true
    this._drag.isScrolling = false
    this._drag.time = new Date().getTime()
    this._drag.start = stage
    this._drag.current = stage
    this._drag.delta = {
      x: 0,
      y: 0
    }

    this._drag.pointer = pointer(event)
    this._drag.target = event.target
  },

  /**
   * Handle `mousemove` and `touchmove` events
   * @param  {MouseEvent|TouchEvent} event
   */
  _onDragMove (event) {
    if (!this._drag.isDragging) {
      return
    }

    var delta = difference(this._drag.pointer, pointer(event))
    var stage = difference(this._drag.start, delta)
    var isScrolling = isTouch() && Math.abs(delta.x) < Math.abs(delta.y)

    if (!isScrolling) {
      event.preventDefault()
      this._transform(stage.x, 0)
    }

    this._drag.delta = delta
    this._drag.current = stage
    this._drag.isScrolling = isScrolling
    this._drag.target = event.target
  },

  /**
   * Handle `mouseup` and `touchend` events
   * @param  {MouseEvent|TouchEvent} event
   */
  _onDragEnd (event) {
    if (!this._drag.isDragging) {
      return
    }

    this._setContentTransitionDuration('')
    
    this._drag.duration = new Date().getTime() - this._drag.time

    var dx = Math.abs(this._drag.delta.x)
    var change = dx > 20 || dx > this._itemWidth / 3
    var factor = Math.max(Math.round(dx / this._itemWidth), 1)
    var next = this._drag.delta.x > 0

    if (change) {
      var currentIndex = this._items.indexOf(this._current)
      var index = next ? currentIndex + factor : currentIndex - factor
      this._to(index)
    }
    else {
      this._transform(this._drag.start.x)
    }

    this._drag.isDragging = false
    this._drag.wasDragging = true
  },

  /**
   * Prevent and stop the default actions on text selection and dragging elements
   * @param  {Event|DragEvent} event
   */
  _onMouseDrag (event) {
    event.preventDefault()
    event.stopPropagation()
  },

  /**
   * Determine if the carousel is currently in the visibile viewport.
   * @return {Boolean}
   */
  _isOnScreen () {
    var rect = this.element.getBoundingClientRect()
    return rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
  },

  /**
   * Initialize the carousel.
   */
  init () {
    this._resizeWidth = window.innerWidth
    this._reset()
  },

  /**
   * Destroy the carousel.
   */
  destroy () {
    this.stop()
    clearTimeout(this._resizeTimer)
  }
})

handler.register('mdk-carousel', carouselComponent)