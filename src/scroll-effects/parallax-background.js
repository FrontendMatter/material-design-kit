const FRONT_LAYER = '[class*="__bg-front"]'
const REAR_LAYER = '[class*="__bg-rear"]'
const BG = '[class$="__bg"]'

/**
 * parallax-background effect
 */
export const SCROLL_EFFECT_PARALLAX_BACKGROUND = {
  name: 'parallax-background',
  setUp () {},
  tearDown () {
    let layers = [ 
      this.element.querySelector(FRONT_LAYER), 
      this.element.querySelector(REAR_LAYER)
    ]

    let props = ['marginTop', 'marginBottom']

    layers.map(layer => {
      if (layer) {
        this._transform('translate3d(0, 0, 0)', layer)
        props.forEach((prop) => layer.style[prop] = '')
      }
    })
  },
  run (progress, top) {
    let unscrolledPercent = (this.scrollTarget.scrollHeight - this._scrollTargetHeight) / this.scrollTarget.scrollHeight
    let distance = this.element.offsetHeight * unscrolledPercent
    
    if (this._dHeight !== undefined) {
      unscrolledPercent = this._dHeight / this.element.offsetHeight
      distance = this._dHeight * unscrolledPercent
    }

    let scalar = 0.5
    let delta = Math.abs(distance * scalar).toFixed(5)
    
    let max = this._isPositionedFixedEmulated ? 1000000 : distance
    let deltaProgress = delta * progress
    let transform = (Math.min(deltaProgress, max)).toFixed(5)

    let layers = [ 
      this.element.querySelector(FRONT_LAYER), 
      this.element.querySelector(REAR_LAYER)
    ]

    layers.map(layer => {
      if (layer) {
        layer.style['marginTop'] = `${ -1 * delta }px`
        this._transform(`translate3d(0, ${ transform }px, 0)`, layer)
      }
    })

    let bgNode = this.element.querySelector(BG)
    if (!bgNode.style.visibility) {
      bgNode.style.visibility = 'visible'
    }
  }
}