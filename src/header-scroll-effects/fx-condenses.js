const interpolate = (progress, points, fn, ctx) => {
  fn.apply(ctx, points.map(function (point) {
    return point[0] + (point[1] - point[0]) * progress
  }))
}

/**
 * fx-condenses effect
 * 
 * Transform properties of one or more designated header elements 
 * between two values based on the scroll position.
 */
export const HEADER_SCROLL_EFFECT_FX_CONDENSES = {
  name: 'fx-condenses',
  setUp () {
    const elements = [ ...this.element.querySelectorAll('[data-fx-condenses]') ]
    const targets = [ ...this.element.querySelectorAll('[data-fx-id]') ]

    let bounds = {}

    elements.forEach(element => {
      if (element) {
        element.style.willChange = 'transform'
        this._transform('translateZ(0)', element)
        if (window.getComputedStyle(element).display === 'inline') {
          element.style.display = 'inline-block'
        }

        let id = element.getAttribute('id')
        if (!element.hasAttribute('id')) {
          id = 'rt' + (0 | Math.random() * 9e6).toString(36)
          element.setAttribute('id', id)
        }

        const bound = element.getBoundingClientRect()
        bounds[id] = bound
      }
    })

    targets.forEach(target => {
      if (target) {
        let id = target.getAttribute('id')
        let fxId = target.getAttribute('data-fx-id')
        let fxEl = this.element.querySelector(`#${ fxId }`)

        let targetBounds = bounds[id]
        let fxBounds = bounds[fxId]

        const hasTextContent = target.textContent.trim().length > 0
        let scale = 1

        if (fxBounds !== undefined) {
          bounds[id].dx = targetBounds.left - fxBounds.left
          bounds[id].dy = targetBounds.top - fxBounds.top

          if (hasTextContent) {
            scale = parseInt(window.getComputedStyle(fxEl)['font-size'], 10) / 
            parseInt(window.getComputedStyle(target)['font-size'], 10)
          }
          else {
            scale = fxBounds.height / targetBounds.height
          }
          bounds[id].scale = scale
        }
      }
    })

    this._fxCondenses = {
      elements,
      targets,
      bounds
    }
  },
  run (progress, top) {
    let fx = this._fxCondenses
    if (!this.condenses) {
      top = 0
    }
    if (progress >= 1) {
      fx.elements.forEach(el => {
        if (el) {
          el.style.willChange = 'opacity'
          el.style.opacity = fx.targets.indexOf(el) !== -1 ? 0 : 1
        }
      })
    }
    else {
      fx.elements.forEach(el => {
        if (el) {
          el.style.willChange = 'opacity'
          el.style.opacity = fx.targets.indexOf(el) !== -1 ? 1 : 0
        }
      })
    }
    fx.targets.forEach(target => {
      if (target) {
        let id = target.getAttribute('id')
        interpolate(
          Math.min(1, progress), 
          [ [1, fx.bounds[id].scale], [0, -fx.bounds[id].dx], [top, top - fx.bounds[id].dy] ],
          (scale, translateX, translateY) => {
            target.style.willChange = 'transform'
            translateX = translateX.toFixed(5)
            translateY = translateY.toFixed(5)
            scale = scale.toFixed(5)
            this._transform(`translate(${ translateX }px, ${ translateY }px) scale3d(${ scale }, ${ scale }, 1)`, target)
          })  
      }
    })
  },
  tearDown () {
    delete this._fxCondenses    
  }
}