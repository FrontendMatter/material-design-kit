import { assign } from '../util'
import { scrollEffectBehavior } from '../scroll-effect-behavior'

const MODULE = 'mdk-box'
const BG = `.${ MODULE }__bg`
const FRONT_LAYER = `${ BG }-front`
const REAR_LAYER = `${ BG }-rear`

/**
 * A container element for generic content with 
 * visual effects based on scroll position
 * 
 * @param  {HTMLElement} 		element      	The component DOM element
 * @param  {string|HTMLElement} scrollTarget 	The scroll target (optional)
 * @param  {Array} 				effects 		The effect names to run
 * @return {Object}
 */
export const boxComponent = (element, scrollTarget, effects = []) => {

	// ScrollEffectBehavior options
	scrollTarget = element.hasAttribute('scroll-target') ? element.getAttribute('scroll-target') : scrollTarget
	effects = element.hasAttribute('effects') ? (element.getAttribute('effects') || '').split(' ') : effects
	
	let component = {

		// The current scroll progress
		_progress: 0,

		get disabled () {
			return this.element.hasAttribute('disabled')
		},

		/**
		 * Returns true if the element is visible in the current viewport.
		 * @return {Boolean}
		 */
		isOnScreen () {
			return this._elementTop < this._scrollTop + this._cachedScrollTargetHeight && 
				this._elementTop + this._elementHeight > this._scrollTop
		},

		/**
		 * Returns an object containing the progress value of the scroll effects.
		 * @return {Object}
		 */
		getScrollState () {
			return {
				progress: this._progress
			}
		},

		_setupBackgrounds () {
			let bgNode = document.createElement('DIV')
			this.element.insertBefore(bgNode, this.element.childNodes[0])
			bgNode.classList.add(BG.substr(1))

			const bgLayerClassNames = [FRONT_LAYER.substr(1), REAR_LAYER.substr(1)]
			bgLayerClassNames.map(className => {
				let bgNodeLayer = document.createElement('DIV')
				bgNode.appendChild(bgNodeLayer)
				bgNodeLayer.classList.add(className)
			})
		},

		_setUpLayout () {
			if (this.element.offsetWidth === 0 && this.element.offsetHeight === 0) {
				return
			}

			let scrollTop = this._clampedScrollTop
			this._elementTop = this._getElementTop()
			this._elementHeight = this.element.offsetHeight
			this._cachedScrollTargetHeight = this._scrollTargetHeight

			this._setUpEffects()
			this._updateScrollState(scrollTop)
		},

		_getElementTop () {
			let currentNode = this.element
			let top = 0

			while (currentNode && currentNode !== this.scrollTarget) {
				top += currentNode.offsetTop
				currentNode = currentNode.offsetParent
			}
			return top
		},

		/**
		 * Updates the scroll state.
		 * @param  {number} scrollTop
		 */
		_updateScrollState (scrollTop) {
			if (this.disabled) {
				return
			}

			if (this.isOnScreen()) {
				let viewportTop = this._elementTop - scrollTop
				let progress = 1 - (viewportTop + this._elementHeight) / this._cachedScrollTargetHeight

				this._progress = progress
				this._runEffects(this._progress, scrollTop)
			}
		}
	}

	// Merge behaviors
	let componentWithBehavior = assign(
		{},
		scrollEffectBehavior(element, scrollTarget, effects),
		component
	)

	// Attach to scrollTarget
	componentWithBehavior.attachToScrollTarget(scrollTarget)

	// Setup backgrounds
	componentWithBehavior._setupBackgrounds()

	// Setup layout
	componentWithBehavior._setUpLayout()

	return componentWithBehavior
}