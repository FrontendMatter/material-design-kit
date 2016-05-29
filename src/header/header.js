import { assign } from '../util'
import { scrollEffectBehavior } from '../scroll-effect-behavior'

const MODULE = 'mdk-header'
const CONTENT = `.${ MODULE }__content`
const BG = `.${ MODULE }__bg`
const FRONT_LAYER = `${ BG }-front`
const REAR_LAYER = `${ BG }-rear`
const MODIFIER_FIXED = `${ MODULE }--fixed`

/**
 * A container element for navigation and other content at the top 
 * of the screen with visual effects based on scroll position
 * 
 * @param  {HTMLElement} 		element      	The component DOM element
 * @param  {string|HTMLElement} scrollTarget 	The scroll target (optional)
 * @param  {Array} 				effects 		The effect names to run
 * @return {Object}
 */
export const headerComponent = (element, scrollTarget, effects = []) => {

	// ScrollEffectBehavior options
	scrollTarget = element.hasAttribute('scroll-target') ? element.getAttribute('scroll-target') : scrollTarget
	effects = element.hasAttribute('effects') ? (element.getAttribute('effects') || '').split(' ') : effects

	let component = {

		get condenses () {
			return this.element.hasAttribute('condenses')
		},

		get reveals () {
			return this.element.hasAttribute('reveals')
		},

		get fixed () {
			return this.element.hasAttribute('fixed')
		},

		get disabled () {
			return this.element.hasAttribute('disabled')
		},

		get transformDisabled () {
			return this.disabled || this.element.hasAttribute('transform-disabled')
		},

		// A cached offsetHeight of the element
		_height: 0,

		// The distance in pixels the header will be translated to when scrolling
		_dHeight: 0,

		// The offsetTop of `_primaryElement`
		_primaryElementTop: 0,

		// The element that remains visibile when the header condenses
		_primaryElement: null,

		// The header's top value used for the `transformY`
		_top: 0,

		// The current scroll progress
		_progress: 0,

		_wasScrollingDown: false,
		_initScrollTop: 0,
		_initTimestamp: 0,
		_lastTimestamp: 0,
		_lastScrollTop: 0,

		/**
		 * The distance the header is allowed to move away.
		 * @return {number}
		 */
		get _maxHeaderTop () {
			return this.fixed ? this._dHeight : this._height + 5
		},

		get _isPositionedFixed () {
			return this.fixed || this.condenses || this.reveals
		},

		/**
		 * Returns true if the header will condense based on the size of the header
		 * @return {Boolean}
		 */
		willCondense () {
			return this._dHeight > 0 && this.condenses
		},

		/**
		 * Returns true if the element is visible in the current viewport.
		 * @return {Boolean}
		 */
		isOnScreen () {
			return this._height !== 0 && this._top < this._height
		},

		/**
		 * Returns true if there's content below the element.
		 * @return {Boolean}
		 */
		isContentBelow () {
			if (this._top === 0) {
				return this._clampedScrollTop > 0
			}
			return this._clampedScrollTop - this._maxHeaderTop >= 0
		},

		/**
		 * Returns an object containing the progress value of the scroll effects 
		 * and the top position of the header.
		 * @return {Object}
		 */
		getScrollState () {
			return {
				progress: this._progress,
				top: this._top
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
			if (this._isPositionedFixed) {
				this.element.classList.add(MODIFIER_FIXED)
			}

			if (this.element.offsetWidth === 0 && this.element.offsetHeight === 0) {
				return
			}

			let scrollTop = this._clampedScrollTop
			let firstSetup = this._height === 0 || scrollTop === 0

			this._height = this.element.offsetHeight
			this._primaryElement = this._getPrimaryElement()
			this._primaryElementTop = this._primaryElement ? this._primaryElement.offsetTop : 0
			this._dHeight = 0
			
			if (this._mayMove()) {
				this._dHeight = this._primaryElement ? this._height - this._primaryElement.offsetHeight : 0
			}
			
			this._updateScrollState(firstSetup ? scrollTop : this._lastScrollTop, true)
			this._setUpEffects()
		},

		// Pass MouseWheel events from `scrollTarget` with `position: fixed`
		_setUpFixedPositionedScroll () {
			if (this._fixedPositionedScrollHandler !== undefined) {
				this.element.removeEventListener('wheel', this._fixedPositionedScrollHandler)
			}
			if (this._isPositionedFixed && this.scrollTarget !== this._doc) {
				this._fixedPositionedScrollHandler = (e) => {
					let passMouseEvent = new WheelEvent(e.type, e)
					this.scrollTarget.dispatchEvent(passMouseEvent)
				}
				this.element.addEventListener('wheel', this._fixedPositionedScrollHandler)
			}
		},

		/**
		 * Returns a reference to the element that remains visible when the header condenses.
		 * @return {HTMLElement}
		 */
		_getPrimaryElement () {
			let primaryElement
			let nodes = this.element.querySelector(CONTENT).children

			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].nodeType === Node.ELEMENT_NODE) {
					let node = nodes[i]
					if (node.hasAttribute('primary')) {
						primaryElement = node
						break
					}
					else if (!primaryElement) {
						primaryElement = node
					}
				}
			}
			return primaryElement
		},

		/**
		 * Updates the scroll state.
		 * @param  {number} scrollTop
		 * @param  {Boolean} forceUpdate
		 */
		_updateScrollState (scrollTop, forceUpdate) {
			if (this._height === 0 || this.disabled) {
				return
			}

			let progress = 0
			let top = 0
			let lastTop = this._top
			let lastScrollTop = this._lastScrollTop
			let maxHeaderTop = this._maxHeaderTop
			let dScrollTop = scrollTop - lastScrollTop
			let absDScrollTop = Math.abs(dScrollTop)
			let isScrollingDown = scrollTop > lastScrollTop
			let now = Date.now()

			if (scrollTop === lastScrollTop) {
				return
			}

			if (this._mayMove()) {
				top = this._clamp(this.reveals ? lastTop + dScrollTop : scrollTop, 0, maxHeaderTop)
			}

			if (scrollTop >= this._dHeight) {
				top = this.condenses ? Math.max(this._dHeight, top) : top
				this.element.style.transitionDuration = '0ms'
			}

			if (this.reveals && !this.disabled && absDScrollTop < 100) {
				if (now - this._initTimestamp > 300 || this._wasScrollingDown !== isScrollingDown) {
					this._initScrollTop = scrollTop
					this._initTimestamp = now
				}
				if (scrollTop >= maxHeaderTop) {
					if (Math.abs(this._initScrollTop - scrollTop) > 30 || absDScrollTop > 10) {
						if (isScrollingDown && scrollTop >= maxHeaderTop) {
							top = maxHeaderTop
						}
						else if (!isScrollingDown && scrollTop >= this._dHeight) {
							top = this.condenses ? this._dHeight : 0
						}

						let scrollVelocity = dScrollTop / (now - this._lastTimestamp)
						this.element.style.transitionDuration = `${ this._clamp((top - lastTop) / scrollVelocity, 0, 300) }ms`
					}
					else {
						top = this._top
					}
				}
			}

			if (this._dHeight === 0) {
				progress = scrollTop > 0 ? 1 : 0
			}
			else {
				progress = top / this._dHeight
			}

			if (!forceUpdate) {
				this._lastScrollTop = scrollTop
				this._top = top
				this._wasScrollingDown = isScrollingDown
				this._lastTimestamp = now
			}

			if (forceUpdate || progress !== this._progress || lastTop !== top || scrollTop === 0) {
				this._progress = progress
				this._runEffects(progress, top)
				if (!this.transformDisabled) {
					this._transformHeader(top)
				}
			}
		},

		/**
		 * Transforms the header.
		 * @param  {number} top
		 */
		_transformHeader (top) {
			this._transform(`translate3d(0, ${ -top }px, 0)`)

			if (this._primaryElement && this.condenses && top >= this._primaryElementTop) {
				this._transform(`translate3d(0, ${ Math.min(top, this._dHeight) - this._primaryElementTop }px, 0)`, this._primaryElement)
			}
		},

		_clamp (v, min, max) {
			return Math.min(max, Math.max(min, v))
		},

		/**
		 * Returns true if the current header is allowed to move as the user scrolls.
		 * @return {Boolean}
		 */
		_mayMove () {
			return this.condenses || !this.fixed
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

	// Handle fixed positioned scroll
	componentWithBehavior._setUpFixedPositionedScroll()

	// Setup backgrounds
	componentWithBehavior._setupBackgrounds()

	// Setup layout
	componentWithBehavior._setUpLayout()

	return componentWithBehavior
}