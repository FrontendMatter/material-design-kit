import { assign } from '../util'
import { scrollTargetBehavior } from '../scroll-target-behavior'

/**
 * Allows a ScrollTargetBehavior element to use scroll effects
 * @param  {HTMLElement} 		element      	The element which should respond to scroll events
 * @param  {string|HTMLElement} scrollTarget 	The scroll target (optional)
 * @param  {Array} 				effects 		The effect names to run
 * @param  {Object} 			effectsConfig 	Optional effects configuration object
 * @return {Object}
 */
export const scrollEffectBehavior = (element, scrollTarget, effects = [], effectsConfig = {}) => {

	if (element.hasAttribute('effects-config')) {
		try {
			effectsConfig = JSON.parse(element.getAttribute('effects-config'))
		}
		catch (e) {
			console.warn(`scrollEffectBehavior: Invalid [effects-config] value. Error: ${ e }`)
		}
	}

	let behavior = {

		// List of effect names to run
		effects,

		// Optional effects config object
		effectsConfig,

		// List of registered scroll effects
		_scrollEffects: {},

		// List of effects handlers that will take place during scroll
		_effectsRunFn: [],

		// List of the effects definitions
		_effects: [],

		/**
		 * Registers a scroll effect
		 * @param  {string} effectName The effect name
		 * @param  {Object} effectDef  The effect definition
		 */
		registerEffect (effectName, effectDef) {
			if (this._scrollEffects[effectName] !== undefined) {
				throw new Error(`effect ${ effectName } is already registered.`)
			}
			this._scrollEffects[effectName] = effectDef
			this._setUpEffects()
		},

		/**
		 * Returns true if the element is visible in the current viewport.
		 * This method should be overridden by the consumer of this behavior.
		 * @return {Boolean}
		 */
		isOnScreen () {
			return false
		},

		/**
		 * Returns true if there's content below the element.
		 * This method should be overridden by the consumer of this behavior.
		 * @return {Boolean}
		 */
		isContentBelow () {
			return false
		},

		/**
		 * Creates an effect object from an effect's name that can be used to run
	     * effects programmatically.
		 * @param  {string} effectName   The effect name
		 * @param  {Object} effectConfig The effect config (optional)
		 * @return {Object}              An effect object with the following functions:
		 *
		 * `effect.setUp()`, Sets up the requirements for the effect 
		 * `effect.run(progress, top)`, Runs the effect given a `progress`
		 * `effect.tearDown()`, Clean up
		 */
		createEffect (effectName, effectConfig = {}) {
			const effectDef = this._scrollEffects[effectName]
			if (typeof effectDef === undefined) {
				throw new ReferenceError(this._getUndefinedMessage(effectName))
			}
			const prop = this._boundEffect(effectDef, effectConfig)
			prop.setUp()
			return prop
		},

		/**
		 * Returns an effect object bound to the current context.
		 * @param  {Object} effectDef     The effect definition
		 * @param  {Object} effectConfig  The effect config (optional)
		 * @return {Object}
		 */
		_boundEffect (effectDef, effectConfig = {}) {
			let startsAt = parseFloat(effectConfig.startsAt || 0)
			let endsAt = parseFloat(effectConfig.endsAt || 1)
			let deltaS = endsAt - startsAt
			let noop = Function()
			let runFn = (startsAt === 0 && endsAt === 1) ? effectDef.run : function (progress, top) {
				effectDef.run.call(this, Math.max(0, (progress - startsAt) / deltaS), top)
			}
			return {
				setUp: effectDef.setUp ? effectDef.setUp.bind(this, effectConfig) : noop,
				run: effectDef.run ? runFn.bind(this) : noop,
				tearDown: effectDef.tearDown ? effectDef.tearDown.bind(this) : noop
			}
		},

		/**
		 * The clamped value of `_scrollTop`.
		 * @return {number}
		 */
		get _clampedScrollTop () {
			return Math.max(0, this._scrollTop)
		},

		/**
		 * Gets the unregistered effect error message
		 * @param  {string} effectName The effect name
		 * @return {string}
		 */
		_getUndefinedMessage (effectName) {
			return `Scroll effect ${ effectName } was not registered`
		},

		/**
		 * Sets up the effects.
		 */
		_setUpEffects () {
			this._tearDownEffects()
			
			this.effects.forEach((effectName) => {
				let effectDef
				if ((effectDef = this._scrollEffects[effectName])) {
					this._effects.push(this._boundEffect(effectDef, this.effectsConfig[effectName]))
				}
			})

			this._effects.forEach((effectDef) => {
				if (effectDef.setUp() !== false) {
					this._effectsRunFn.push(effectDef.run)
				}
			})
		},

		/**
		 * Tears down the effects.
		 */
		_tearDownEffects () {
			this._effects.forEach((effectDef) => {
				effectDef.tearDown()
			})
			this._effectsRunFn = []
			this._effects = []
		},

		/**
		 * Runs the effects.
		 * @param  {number} progress The progress
		 * @param  {number} top      The top position of the current element relative to the viewport
		 */
		_runEffects (progress, top) {
			this._effectsRunFn.forEach(run => run(progress, top))
		},

		/**
		 * Overrides the `_scrollHandler`
		 */
		_scrollHandler () {
			this._updateScrollState(this._clampedScrollTop)
		},

		/**
		 * Updates the scroll state.
		 * @param  {number} scrollTop
		 */
		_updateScrollState (scrollTop) {},

		/**
		 * Transform style
		 * @param  {String} value   		The transform value
		 * @param  {HTMLElement} element 	The element to apply transforms to (optional)
		 */
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
	}

	// Merge behaviors
	return assign(
		{},
		scrollTargetBehavior(element, scrollTarget),
		behavior
	)
}