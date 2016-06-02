const FRONT_LAYER = '[class*="__bg-front"]'
const REAR_LAYER = '[class*="__bg-rear"]'

/**
 * fade-background effect
 */
export const SCROLL_EFFECT_FADE_BACKGROUND = {
  name: 'fade-background',
  setUp (config) {
    const duration = config.duration || '0.5s'
    const threshold = config.threshold || (this._isPositionedFixed ? 1 : 0.3)

    let frontLayer = this.element.querySelector(FRONT_LAYER)
    let rearLayer = this.element.querySelector(REAR_LAYER)
    const layers = [ frontLayer, rearLayer ]

    layers.map(layer => {
      if (layer) {
        let willChange = layer.style.willChange.split(',').map(c => c.trim()).filter(c => c.length)
        willChange.push('opacity', 'transform')
        layer.style.willChange = [...new Set(willChange)].join(', ')

        if (layer.style.transform === '') {
          this._transform('translateZ(0)', layer)
        }
        layer.style.transitionProperty = 'opacity'
        layer.style.transitionDuration = duration
      }
    })

    this._fadeBackgroundThreshold = !this._isPositionedFixed 
      ? threshold + (this._progress * threshold) 
      : threshold
  },
  tearDown () {
    delete this._fadeBackgroundThreshold
  },
  run (progress, top) {
    let frontLayer = this.element.querySelector(FRONT_LAYER)
    let rearLayer = this.element.querySelector(REAR_LAYER)
    
    if (progress >= this._fadeBackgroundThreshold) {
      frontLayer.style.opacity = 0
      rearLayer.style.opacity = 1
    }
    else {
      frontLayer.style.opacity = 1
      rearLayer.style.opacity = 0
    }
  }
}