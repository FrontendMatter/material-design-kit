import { ScrollEffectBehavior } from '../scroll-effect'

const MOD = 'mdk-header'

const ELEMENT_CONTENT = `.${ MOD }__content`
const ELEMENT_BG_CONTAINER = `.${ MOD }__bg`
const ELEMENT_BG_FRONT_LAYER = `${ ELEMENT_BG_CONTAINER }-front`
const ELEMENT_BG_REAR_LAYER = `${ ELEMENT_BG_CONTAINER }-rear`

const MODIFIER_FIXED = `${ MOD }--fixed`

export class HeaderComponent extends ScrollEffectBehavior {
	
	/**
	 * AppHeader constructor
	 * @param  {HTMLElement}  			element      The HTML element
	 * @param  {string|HTMLElement}  	scrollTarget The scroll target
	 * @param  {Array}   				effects      The effect names to run
	 * @param  {Boolean} 				condenses    [description]
	 * @param  {Boolean} 				reveals      [description]
	 * @param  {Boolean} 				fixed        [description]
	 */
	constructor (element, scrollTarget, effects = []) {

		// ScrollEffectBehavior options
		scrollTarget = element.hasAttribute('scroll-target') ? element.getAttribute('scroll-target') : scrollTarget
		effects = element.hasAttribute('effects') ? (element.getAttribute('effects') || '').split(' ') : effects

		// Setup backgrounds
		let bgNode = document.createElement('DIV')
		element.insertBefore(bgNode, element.childNodes[0])
		bgNode.classList.add(ELEMENT_BG_CONTAINER.substr(1))

		const bgLayerClassNames = [ELEMENT_BG_FRONT_LAYER.substr(1), ELEMENT_BG_REAR_LAYER.substr(1)]
		bgLayerClassNames.map(className => {
			let bgNodeLayer = document.createElement('DIV')
			bgNode.appendChild(bgNodeLayer)
			bgNodeLayer.classList.add(className)
		})

		// Initialize ScrollEffectBehavior
		super(element, scrollTarget, effects)

		this.bgFrontLayer = this.element.querySelector(ELEMENT_BG_FRONT_LAYER)
		this.bgRearLayer = this.element.querySelector(ELEMENT_BG_REAR_LAYER)

		// Background options
		this.bgRearColor = this.element.hasAttribute('bg-rear-color') ? this.element.getAttribute('bg-rear-color') : null
		this.bgFrontColor = this.element.hasAttribute('bg-front-color') ? this.element.getAttribute('bg-front-color') : null

		if (this.bgRearColor) {
			this.bgRearLayer.style.backgroundColor = this.bgRearColor	
		}

		if (this.bgFrontColor) {
			this.bgFrontLayer.style.backgroundColor = this.bgFrontColor
		}

		// Options
		this.condenses = element.hasAttribute('condenses')
		this.reveals = element.hasAttribute('reveals')
		this.fixed = element.hasAttribute('fixed')
		this.disabled = element.hasAttribute('disabled')

		// A cached offsetHeight of the element
		this._height = 0

		// The distance in pixels the header will be translated to when scrolling
		this._dHeight = 0

		// The offsetTop of `_primaryElement`
		this._primaryElementTop = 0

		// The element that remains visibile when the header condenses
		this._primaryElement = null

		// The header's top value used for the `transformY`
		this._top = 0

		// The current scroll progress
		this._progress = 0

		this._wasScrollingDown = false
		this._initScrollTop = 0
		this._initTimestamp = 0
		this._lastTimestamp = 0
		this._lastScrollTop = 0

		// Setup layout
		this._setUpLayout()

		// Pass MouseWheel events from `scrollTarget` with `position: fixed`
		if (this._isPositionedFixed && this.scrollTarget !== this._doc) {
			this.element.addEventListener('wheel', (e) => {
				let passMouseEvent = new WheelEvent(e.type, e)
				this.scrollTarget.dispatchEvent(passMouseEvent)
			})
		}
	}

	/**
	 * The distance the header is allowed to move away.
	 * @return {number}
	 */
	get _maxHeaderTop () {
		return this.fixed ? this._dHeight : this._height + 5
	}

	get _isPositionedFixed () {
		return this.fixed || this.condenses || this.reveals
	}

	_setUpLayout () {
		if (this._isPositionedFixed) {
			this.element.classList.add(MODIFIER_FIXED)
		}

		if (this.element.offsetWidth === 0 && this.element.offsetHeight === 0) {
			return
		}

		let scrollTop = this._clampedScrollTop
		let firstSetup = this._height === 0 || scrollTop === 0
		let currentDisabled = this.disabled

		this._height = this.element.offsetHeight
		this._primaryElement = this._getPrimaryElement()
		this.disabled = true
		
		if (!firstSetup) {
			this._updateScrollState(0, true)
		}

		if (this._mayMove()) {
			this._dHeight = this._primaryElement ? this._height - this._primaryElement.offsetHeight : 0
		}
		else {
			this._dHeight = 0
		}

		this._primaryElementTop = this._primaryElement ? this._primaryElement.offsetTop : 0
		this._setUpEffects()

		if (firstSetup) {
			this._updateScrollState(scrollTop, true)
		}
		else {
			this._updateScrollState(this._lastScrollTop, true)
		}

		this.disabled = currentDisabled
	}

	/**
	 * Returns a reference to the element that remains visible when the header condenses.
	 * @return {HTMLElement}
	 */
	_getPrimaryElement () {
		let primaryElement
		let nodes = this.element.querySelector(ELEMENT_CONTENT).children

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
	}

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
			this._transformHeader(top)
		}
	}

	_transform (value, element) {
		element = element || this.element
		const properties = [
			'transform',
			'WebkitTransform',
			'msTransform',
			'MozTransform',
			'OTransform'
		]
		properties.map(p => element.style[p] = value)
	}

	/**
	 * Transforms the header.
	 * @param  {number} top
	 */
	_transformHeader (top) {
		this._transform(`translate3d(0, ${ -top }px, 0)`)

		if (this._primaryElement && this.condenses && top >= this._primaryElementTop) {
			this._transform(`translate3d(0, ${ Math.min(top, this._dHeight) - this._primaryElementTop }px, 0)`, this._primaryElement)
		}
	}

	_clamp (v, min, max) {
		return Math.min(max, Math.max(min, v))
	}

	/**
	 * Returns true if the element is visible in the current viewport.
	 * @return {Boolean}
	 */
	isOnScreen () {
		return this._height !== 0 && this._top < this._height
	}

	/**
	 * Returns true if there's content below the element.
	 * @return {Boolean}
	 */
	isContentBelow () {
		if (this._top === 0) {
			return this._clampedScrollTop > 0
		}
		return this._clampedScrollTop - this._maxHeaderTop >= 0
	}

	/**
	 * Returns true if the current header is allowed to move as the user scrolls.
	 * @return {Boolean}
	 */
	_mayMove () {
		return this.condenses || !this.fixed
	}
}