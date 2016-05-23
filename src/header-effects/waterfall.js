const MODIFIER = 'mdk-header--shadow'

/**
 * waterfall effect
 */
export const HEADER_EFFECT_WATERFALL = {
	name: 'waterfall',
	run (progress, top) {
		if (this.isOnScreen() && this.isContentBelow()) {
			this.element.classList.add(MODIFIER)
		}
		else {
			this.element.classList.remove(MODIFIER)
		}
	},
	tearDown () {
		this.element.classList.remove(MODIFIER)
	}
}