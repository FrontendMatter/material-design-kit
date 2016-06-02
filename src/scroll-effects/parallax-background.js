const FRONT_LAYER = '[class*="__bg-front"]'
const REAR_LAYER = '[class*="__bg-rear"]'
const CONTAINER = '[class$="__bg"]'

/**
 * parallax-background effect
 */
export const SCROLL_EFFECT_PARALLAX_BACKGROUND = {
  name: 'parallax-background',
  setUp (config) {
    config.distance = config.distance || (this.element.offsetHeight / 3)
    
    let container = this.element.querySelector(CONTAINER)
    let frontLayer = this.element.querySelector(FRONT_LAYER)
    let rearLayer = this.element.querySelector(REAR_LAYER)
    let layers = [ frontLayer, rearLayer ]

    let scalar = parseFloat(config.scalar ? config.scalar : 1.5)
    let distance = frontLayer.offsetHeight - container.offsetHeight

    if (distance === 0) {
      distance = this._dHeight !== undefined ? this._dHeight : parseInt(config.distance, 10)
    }

    let offset = distance
    if (this.element.offsetTop > 0 && !this._isPositionedFixed) {
      offset = distance * scalar
    }
    else if ((this.element.offsetTop === 0 && !this._isPositionedFixed) || this._isPositionedFixed) {
      offset = scalar > 1 ? (distance * scalar) - distance : distance - (distance * scalar)
    }

    this._parallaxBackgroundDelta = distance * scalar
    
    let transform = (this._parallaxBackgroundDelta * Math.min(1, this._progress)).toFixed(5)
    let margin = (-1 * offset).toFixed(5)

    layers.map(layer => {
      if (layer) {
        let willChange = layer.style.willChange.split(',').map(c => c.trim()).filter(c => c.length)
        willChange.push('transform')
        layer.style.willChange = [...new Set(willChange)].join(', ')

        layer.style[scalar > 1 || !this._isPositionedFixed ? 'marginTop' : 'marginBottom'] = `${ margin }px`
        this._transform(`translate3d(0, ${ transform }px, 0)`, layer)
      }
    })
  },
  tearDown () {
    delete this._parallaxBackgroundDelta
    
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
    let layers = [ 
      this.element.querySelector(FRONT_LAYER), 
      this.element.querySelector(REAR_LAYER)
    ]
    
    let transform = (this._parallaxBackgroundDelta * Math.min(1, progress)).toFixed(5)

    layers.map(layer => {
      if (layer) {
        this._transform(`translate3d(0, ${ transform }px, 0)`, layer)
      }
    })
  }
}