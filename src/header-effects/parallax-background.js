const FRONT_LAYER = '.mdk-header__bg-front'
const REAR_LAYER = '.mdk-header__bg-rear'
const CONTAINER = '.mdk-header__bg'

/**
 * parallax-background effect
 */
export const HEADER_EFFECT_PARALLAX_BACKGROUND = {
	name: 'parallax-background',
	setUp (config) {
		let scalar = parseFloat(config.scalar)
		let frontLayer = this.element.querySelector(FRONT_LAYER)
		let container = this.element.querySelector(CONTAINER)

		this._deltaBg = frontLayer.offsetHeight - container.offsetHeight
		if (this._deltaBg === 0) {
			if (isNaN(scalar)) {
				scalar = 0.8
			}
			this._deltaBg = this._dHeight * scalar
		}
		else {
			if (isNaN(scalar)) {
				scalar = 1
			}
			this._deltaBg = this._deltaBg * scalar
		}
	},
	tearDown () {
		delete this._deltaBg
	},
	run (progress, top) {
		let frontLayer = this.element.querySelector(FRONT_LAYER)
		let rearLayer = this.element.querySelector(REAR_LAYER)
		let layers = [ frontLayer, rearLayer ]

		layers.map(layer => {
			if (layer) {
				this._transform(`translate3d(0, ${ this._deltaBg * Math.min(1, progress) }px, 0)`, layer)
			}
		})
	}
}