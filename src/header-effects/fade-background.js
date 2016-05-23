const FRONT_LAYER = '.mdk-header__bg-front'
const REAR_LAYER = '.mdk-header__bg-rear'

/**
 * fade-background effect
 */
export const HEADER_EFFECT_FADE_BACKGROUND = {
	name: 'fade-background',
	setUp (config) {
		const duration = config.duration || '0.5s'
		const layers = [
			this.element.querySelector(FRONT_LAYER),
			this.element.querySelector(REAR_LAYER)
		]

		layers.map(layer => {
			layer.style.willChange = 'opacity'
			layer.style.webkitTransform = 'translateZ(0)'
			layer.style.transitionProperty = 'opacity'
			layer.style.transitionDuration = duration
		})
	},
	run (progress, top) {
		let frontLayer = this.element.querySelector(FRONT_LAYER)
		let rearLayer = this.element.querySelector(REAR_LAYER)

		if (progress >= 1) {
			frontLayer.style.opacity = 0
			rearLayer.style.opacity = 1
		}
		else {
			frontLayer.style.opacity = 1
			rearLayer.style.opacity = 0
		}
	}
}