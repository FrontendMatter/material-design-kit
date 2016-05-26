const FRONT_LAYER = '[class*="__bg-front"]'
const REAR_LAYER = '[class*="__bg-rear"]'

/**
 * blend-background effect
 */
export const SCROLL_EFFECT_BLEND_BACKGROUND = {
	name: 'blend-background',
	setUp () {
		let bgFrontLayer = this.element.querySelector(FRONT_LAYER)
		let bgRearLayer = this.element.querySelector(REAR_LAYER)

		bgFrontLayer.style.willChange = 'opacity'
		bgFrontLayer.style.webkitTransform = 'translateZ(0)'
		
		bgRearLayer.style.willChange = 'opacity'
		bgRearLayer.style.webkitTransform = 'translateZ(0)'
		bgRearLayer.style.opacity = 0
	},
	run (progress, top) {
		let bgFrontLayer = this.element.querySelector(FRONT_LAYER)
		let bgRearLayer = this.element.querySelector(REAR_LAYER)

		bgFrontLayer.style.opacity = 1 - progress
		bgRearLayer.style.opacity = progress
	}
}