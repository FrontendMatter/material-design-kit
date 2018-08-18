import { util } from 'dom-factory'

/**
 * Allows a scrollTargetBehavior consumer to use scroll effects.
 * Use from a consumer via dom-factory mixins i.e. 
 * 
 * import { 
 *   scrollTargetBehavior, 
 *   scrollEffectBehavior 
 * } from 'material-design-kit'
 * 
 * const anotherComponent = () => ({
 *   mixins: [
 *     scrollTargetBehavior,
 *     scrollEffectBehavior
 *   ]
 * })
 * 
 * @param  {HTMLElement} element The element which should respond to scroll events
 * @return {Object}
 */
export const scrollEffectBehavior = () => ({

  // List of registered scroll effects
  _scrollEffects: {},

  // List of effects handlers that will take place during scroll
  _effectsRunFn: [],

  // List of the effects definitions
  _effects: [],

  // Effects config
  _effectsConfig: null,

  /**
   * Get the list of effect names to run
   * @return {Array}
   */
  get effects () {
    if (!this.element.dataset.effects) {
      return []
    }
    return this.element.dataset.effects.split(' ')
  },

  /**
   * Get the effects config object
   * @return {Object}
   */
  get effectsConfig () {
    if (this._effectsConfig) {
      return this._effectsConfig
    }
    if (this.element.hasAttribute('data-effects-config')) {
      try {
        return JSON.parse(this.element.getAttribute('data-effects-config'))
      }
      catch (e) {}
    }
    return {}
  },

  /**
   * Set the effects config object
   * @param  {Object} value
   */
  set effectsConfig (value) {
    this._effectsConfig = value
  },

  /**
   * The clamped value of `_scrollTop`.
   * @return {number}
   */
  get _clampedScrollTop () {
    return Math.max(0, this._scrollTop)
  },

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
      throw new ReferenceError(`Scroll effect ${ effectName } was not registered`)
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
   * Overrides `scrollTargetBehavior._scrollHandler`
   */
  _scrollHandler () {
    this._updateScrollState(this._clampedScrollTop)
    this._loop()
  },

  /**
   * Updates the scroll state. 
   * Should be overriden from the consumer of the behavior.
   * @param  {number} scrollTop
   */
  _updateScrollState (scrollTop) {},

  /**
   * Transform style
   * @param  {String} value       The transform value
   * @param  {HTMLElement} element  The element to apply transforms to (optional)
   */
  _transform (value, element) {
    element = element || this.element
    util.transform(value, element)
  }
})