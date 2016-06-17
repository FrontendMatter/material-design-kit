const FRONT_LAYER = '[class*="__bg-front"]'
const REAR_LAYER = '[class*="__bg-rear"]'

/**
 * blend-background effect
 */
export const SCROLL_EFFECT_BLEND_BACKGROUND = {
  name: 'blend-background',
  setUp () {
    let frontLayer = this.element.querySelector(FRONT_LAYER)
    let rearLayer = this.element.querySelector(REAR_LAYER)
    const layers = [ frontLayer, rearLayer ]

    layers.map(layer => {
      if (layer) {
        if (layer.style.transform === '') {
          this._transform('translateZ(0)', layer)
          layer.style.willChange = 'opacity'
        }
      }
    })

    rearLayer.style.opacity = 0
  },
  run (progress, top) {
    let frontLayer = this.element.querySelector(FRONT_LAYER)
    let rearLayer = this.element.querySelector(REAR_LAYER)

    frontLayer.style.opacity = (1 - progress).toFixed(5)
    rearLayer.style.opacity = progress.toFixed(5)
  }
}