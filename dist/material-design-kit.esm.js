import { util, handler } from 'dom-factory';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var watchObject = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.unwatch=e.watch=void 0;var o=n(4),i=r(o),c=n(3),a=r(c),f=(e.watch=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];var r=e[1];_(r)?g.apply(void 0,e):f(r)?b.apply(void 0,e):w.apply(void 0,e);},e.unwatch=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];var r=e[1];_(r)||void 0===r?m.apply(void 0,e):f(r)?O.apply(void 0,e):x.apply(void 0,e);},function(t){return "[object Array]"==={}.toString.call(t)}),u=function(t){return "[object Object]"==={}.toString.call(t)},_=function(t){return "[object Function]"==={}.toString.call(t)},s=function(t,e,n){(0, a["default"])(t,e,{enumerable:!1,configurable:!0,writable:!1,value:n});},l=function(t,e,n,r){(0, a["default"])(t,e,{get:n,set:function(t){r.call(this,t);},enumerable:!0,configurable:!0});},p=function(t,e,n,r,o){var i=void 0,c=t.__watchers__[e];(i=t.__watchers__.__watchall__)&&(c=c?c.concat(i):i);for(var a=c?c.length:0,f=0;a>f;f++)c[f].call(t,n,r,e,o);},v=["pop","push","reverse","shift","sort","unshift","splice"],h=function(t,e,n,r){s(t,n,function(){for(var o=0,i=void 0,c=void 0,a=arguments.length,f=Array(a),u=0;a>u;u++)f[u]=arguments[u];if("splice"===n){var _=f[0],s=_+f[1];i=t.slice(_,s),c=[];for(var l=2;l<f.length;l++)c[l-2]=f[l];o=_;}else c="push"===n||"unshift"===n?f.length>0?f:void 0:f.length>0?f[0]:void 0;var p=e.apply(t,f);return "pop"===n?(i=p,o=t.length):"push"===n?o=t.length-1:"shift"===n?i=p:"unshift"!==n&&void 0===c&&(c=p),r.call(t,o,n,c,i),p});},d=function(t,e){if(_(e)&&t&&!(t instanceof String)&&f(t))for(var n=v.length;n>0;n--){var r=v[n-1];h(t,t[r],r,e);}},y=function(t,e,n,r){var o=!1,c=f(t);void 0===t.__watchers__&&(s(t,"__watchers__",{}),c&&d(t,function(n,o,i,c){if(p(t,n,i,c,o),0!==r&&i&&(u(i)||f(i))){var a=void 0,_=t.__watchers__[e];(a=t.__watchers__.__watchall__)&&(_=_?_.concat(a):a);for(var s=_?_.length:0,l=0;s>l;l++)if("splice"!==o)g(i,_[l],void 0===r?r:r-1);else for(var v=0;v<i.length;v++)g(i[v],_[l],void 0===r?r:r-1);}})),void 0===t.__proxy__&&s(t,"__proxy__",{}),void 0===t.__watchers__[e]&&(t.__watchers__[e]=[],c||(o=!0));for(var _=0;_<t.__watchers__[e].length;_++)if(t.__watchers__[e][_]===n)return;t.__watchers__[e].push(n),o&&!function(){var n=(0, i["default"])(t,e);void 0!==n?!function(){var r={enumerable:n.enumerable,configurable:n.configurable},o=["get","set"];o.forEach(function(e){void 0!==n[e]&&(r[e]=function(){for(var r=arguments.length,o=Array(r),i=0;r>i;i++)o[i]=arguments[i];return n[e].apply(t,o)});});var i=["writable","value"];i.forEach(function(t){void 0!==n[t]&&(r[t]=n[t]);}),(0, a["default"])(t.__proxy__,e,r);}():t.__proxy__[e]=t[e];var o=function(){return t.__proxy__[e]},c=function(n){var o=t.__proxy__[e];if(0!==r&&t[e]&&(u(t[e])||f(t[e]))&&!t[e].__watchers__)for(var i=0;i<t.__watchers__[e].length;i++)g(t[e],t.__watchers__[e][i],void 0===r?r:r-1);o!==n&&(t.__proxy__[e]=n,p(t,e,n,o,"set"));};l(t,e,o,c);}();},g=function P(t,e,n){if("string"!=typeof t&&(t instanceof Object||f(t)))if(f(t)){if(y(t,"__watchall__",e,n),void 0===n||n>0)for(var r=0;r<t.length;r++)P(t[r],e,n);}else {var o=[];for(var i in t)({}).hasOwnProperty.call(t,i)&&o.push(i);b(t,o,e,n);}},w=function(t,e,n,r){"string"!=typeof t&&(t instanceof Object||f(t))&&(_(t[e])||(null!==t[e]&&(void 0===r||r>0)&&g(t[e],n,void 0!==r?r-1:r),y(t,e,n,r)));},b=function(t,e,n,r){if("string"!=typeof t&&(t instanceof Object||f(t)))for(var o=0;o<e.length;o++){var i=e[o];w(t,i,n,r);}},x=function(t,e,n){if(void 0!==t.__watchers__&&void 0!==t.__watchers__[e])if(void 0===n)delete t.__watchers__[e];else for(var r=0;r<t.__watchers__[e].length;r++)t.__watchers__[e][r]===n&&t.__watchers__[e].splice(r,1);},O=function(t,e,n){for(var r in e)e.hasOwnProperty(r)&&x(t,e[r],n);},j=function S(t,e){var n=[];for(var r in t)t.hasOwnProperty(r)&&(t[r]instanceof Object&&S(t[r],e),n.push(r));O(t,n,e);},m=function(t,e){if(!(t instanceof String||!t instanceof Object&&!f(t)))if(f(t)){for(var n=["__watchall__"],r=0;r<t.length;r++)n.push(r);O(t,n,e);}else j(t,e);};},function(t,e){var n=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n);},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach};},function(t,e,n){t.exports={"default":n(5),__esModule:!0};},function(t,e,n){t.exports={"default":n(6),__esModule:!0};},function(t,e,n){var r=n(2);t.exports=function(t,e,n){return r.setDesc(t,e,n)};},function(t,e,n){var r=n(2);n(17),t.exports=function(t,e){return r.getDesc(t,e)};},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t};},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)};},function(t,e,n){var r=n(7);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}};},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t};},function(t,e,n){var r=n(13),o=n(1),i=n(9),c="prototype",a=function(t,e,n){var f,u,_,s=t&a.F,l=t&a.G,p=t&a.S,v=t&a.P,h=t&a.B,d=t&a.W,y=l?o:o[e]||(o[e]={}),g=l?r:p?r[e]:(r[e]||{})[c];l&&(n=e);for(f in n)u=!s&&g&&f in g,u&&f in y||(_=u?g[f]:n[f],y[f]=l&&"function"!=typeof g[f]?n[f]:h&&u?i(_,r):d&&g[f]==_?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e[c]=t[c],e}(_):v&&"function"==typeof _?i(Function.call,_):_,v&&((y[c]||(y[c]={}))[f]=_));};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,t.exports=a;},function(t,e){t.exports=function(t){try{return !!t()}catch(e){return !0}};},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(t,e,n){var r=n(8);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return "String"==r(t)?t.split(""):Object(t)};},function(t,e,n){var r=n(11),o=n(1),i=n(12);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],c={};c[t]=e(n),r(r.S+r.F*i(function(){n(1);}),"Object",c);};},function(t,e,n){var r=n(14),o=n(10);t.exports=function(t){return r(o(t))};},function(t,e,n){var r=n(16);n(15)("getOwnPropertyDescriptor",function(t){return function(e,n){return t(r(e),n)}});}])});
});

/**
 * Allows an element to respond to scroll events from a designated scroll target.
 * Use from a consumer via dom-factory mixins i.e. 
 * 
 * import { scrollTargetBehavior } from 'material-design-kit'
 * const anotherComponent = () => ({
 *   mixins: [ scrollTargetBehavior ]
 * })
 * 
 * @param  {HTMLElement} element The element which should respond to scroll events
 * @return {Object}
 */
const scrollTargetBehavior = () => ({

  // The scroll target selector
  _scrollTargetSelector: null,

  // The scroll target HTMLElement
  _scrollTarget: null,
  
  /**
   * Get the HTMLELement of the scroll target
   * @return {HTMLElement}
   */
  get scrollTarget () {
    if (this._scrollTarget) {
      return this._scrollTarget
    }
    return this._defaultScrollTarget
  },

  /**
   * Set the HTMLElement of the scroll target
   * @param  {HTMLElement} value
   */
  set scrollTarget (value) {
    this._scrollTarget = value;
  },

  /**
   * Get the scroll target selector
   * @return {String|HTMLElement}
   */
  get scrollTargetSelector () {
    if (this._scrollTargetSelector) {
      return this._scrollTargetSelector
    }
    if (this.element.hasAttribute('data-scroll-target')) {
      return this.element.getAttribute('data-scroll-target')
    }
  },

  /**
   * Set the scroll target selector
   * @param  {String|HTMLElement} value
   */
  set scrollTargetSelector (value) {
    this._scrollTargetSelector = value;
  },

  /**
   * Get the default scroll target
   * @return {HTMLElement}
   */
  get _defaultScrollTarget () {
    return this._doc
  },

  /**
   * Get the ownerDocument
   * @return {HTMLElement}
   */
  get _owner () {
    return this.element.ownerDocument
  },

  /**
   * Get the document element
   * @return {HTMLElement}
   */
  get _doc () {
    return this._owner.documentElement
  },

  /**
   * Gets the number of pixels that the content of an element is scrolled upward.
   * @return {number}
   */
  get _scrollTop () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.pageYOffset : this.scrollTarget.scrollTop
    }
    return 0
  },

  /**
   * Sets the number of pixels that the content of an element is scrolled upward.
   * @param  {number} top
   */
  set _scrollTop (top) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(window.pageXOffset, top);
    }
    else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollTop = top;
    }
  },

  /**
   * Gets the number of pixels that the content of an element is scrolled to the left.
   * @return {number}
   */
  get _scrollLeft () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.pageXOffset : this.scrollTarget.scrollLeft
    }
    return 0
  },

  /**
   * Sets the number of pixels that the content of an element is scrolled to the left.
   * @param  {number} left
   */
  set _scrollLeft (left) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(left, window.pageYOffset);
    }
    else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollLeft = left;
    }
  },

  /**
   * Gets the width of the scroll target.
   * @return {number}
   */
  get _scrollTargetWidth () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.innerWidth : this.scrollTarget.offsetWidth
    }
    return 0
  },

  /**
   * Gets the height of the scroll target.
   * @return {number}
   */
  get _scrollTargetHeight () {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.innerHeight : this.scrollTarget.offsetHeight
    }
    return 0
  },

  get _isPositionedFixed () {
    if (this.element instanceof HTMLElement) {
      return window.getComputedStyle(this.element).position === 'fixed'
    }
    return false
  },

  /**
   * Attach the scroll event listener to the scroll target
   * @param  {string|HTMLElement} scrollTarget The scroll target (optional)
   */
  attachToScrollTarget () {
    this.detachFromScrollTarget();
    watchObject.watch(this, 'scrollTargetSelector', this.attachToScrollTarget);
    
    if (this.scrollTargetSelector === 'document') {
      this.scrollTarget = this._doc;
    }
    else if (typeof this.scrollTargetSelector === 'string') {
      this.scrollTarget = document.querySelector(`${ this.scrollTargetSelector }`);
    }
    else if (this.scrollTargetSelector instanceof HTMLElement) {
      this.scrollTarget = this.scrollTargetSelector;
    }

    if (!this._doc.style.overflow) {
      this._doc.style.overflow = this.scrollTarget !== this._doc ? 'hidden' : '';
    }

    if (this.scrollTarget) {
      this.eventTarget = this.scrollTarget === this._doc ? window : this.scrollTarget;
      this._boundScrollHandler = this._boundScrollHandler || this._scrollHandler.bind(this);
      this._loop();
      // this.eventTarget.addEventListener('scroll', this._boundScrollHandler)
    }
  },

  _loop () {
    requestAnimationFrame(this._boundScrollHandler);
  },

  /**
   * Detach the scroll event listener from the scroll target
   * @return {[type]} [description]
   */
  detachFromScrollTarget () {
    watchObject.unwatch(this, 'scrollTargetSelector', this.attachToScrollTarget);
    // if (this.eventTarget) {
    //   this.eventTarget.removeEventListener('scroll', this._boundScrollHandler)
    // }
  },

  /**
   * Scrolls the content to a particular place.
   * @param  {number} left The left position
   * @param  {number} top  The top position
   */
  scroll (left = 0, top = 0) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(left, top);
    }
    else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollLeft = left;
      this.scrollTarget.scrollTop = top;
    }
  },

  /**
   * Scrolls the content to a particular place using a behavior.
   * @param  {Number} left     The left position
   * @param  {Number} top      The top position
   * @param  {String} behavior The behavior name
   * @param  {Function} scrollFn Custom scroll timing function used with `behavior` (optional)
   */
  scrollWithBehavior (left = 0, top = 0, behavior, scrollFn) {

    // Scroll timing function used with `behavior`
    scrollFn = typeof scrollFn === 'function' ? scrollFn : function easeOutQuad (t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b
    };
    
    // Smooth
    if (behavior === 'smooth') {
      let startTime = Date.now();
      let currentScrollTop = this._scrollTop;
      let currentScrollLeft = this._scrollLeft;
      let dScrollTop = top - currentScrollTop;
      let dScrollLeft = left - currentScrollLeft;
      let duration = 300;

      (function updateFrame () {
        let now = Date.now();
        let elapsedTime = now - startTime;

        if (elapsedTime < duration) {
          this.scroll(
            scrollFn(elapsedTime, currentScrollLeft, dScrollLeft, duration),
            scrollFn(elapsedTime, currentScrollTop, dScrollTop, duration)
          );
          requestAnimationFrame(updateFrame.bind(this));
        }
      }).call(this);
    }

    // Default
    else {
      this.scroll(left, top);
    }
  },

  /**
   * Returns true if the scroll target is a valid HTMLElement.
   * @return {Boolean}
   */
  _isValidScrollTarget () {
    return this.scrollTarget instanceof HTMLElement
  },

  /**
   * Scroll event handler (runs on every scroll event)
   */
  _scrollHandler () {}
});

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
const scrollEffectBehavior = () => ({

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
    this._effectsConfig = value;
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
    this._scrollEffects[effectName] = effectDef;
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
    const effectDef = this._scrollEffects[effectName];
    if (typeof effectDef === undefined) {
      throw new ReferenceError(`Scroll effect ${ effectName } was not registered`)
    }
    const prop = this._boundEffect(effectDef, effectConfig);
    prop.setUp();
    return prop
  },

  /**
   * Returns an effect object bound to the current context.
   * @param  {Object} effectDef     The effect definition
   * @param  {Object} effectConfig  The effect config (optional)
   * @return {Object}
   */
  _boundEffect (effectDef, effectConfig = {}) {
    let startsAt = parseFloat(effectConfig.startsAt || 0);
    let endsAt = parseFloat(effectConfig.endsAt || 1);
    let deltaS = endsAt - startsAt;
    let noop = Function();
    let runFn = (startsAt === 0 && endsAt === 1) ? effectDef.run : function (progress, top) {
      effectDef.run.call(this, Math.max(0, (progress - startsAt) / deltaS), top);
    };
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
    this._tearDownEffects();
    
    this.effects.forEach((effectName) => {
      let effectDef;
      if ((effectDef = this._scrollEffects[effectName])) {
        this._effects.push(this._boundEffect(effectDef, this.effectsConfig[effectName]));
      }
    });

    this._effects.forEach((effectDef) => {
      if (effectDef.setUp() !== false) {
        this._effectsRunFn.push(effectDef.run);
      }
    });
  },

  /**
   * Tears down the effects.
   */
  _tearDownEffects () {
    this._effects.forEach((effectDef) => {
      effectDef.tearDown();
    });
    this._effectsRunFn = [];
    this._effects = [];
  },

  /**
   * Runs the effects.
   * @param  {number} progress The progress
   * @param  {number} top      The top position of the current element relative to the viewport
   */
  _runEffects (progress, top) {
    this._effectsRunFn.forEach(run => run(progress, top));
  },

  /**
   * Overrides `scrollTargetBehavior._scrollHandler`
   */
  _scrollHandler () {
    this._updateScrollState(this._clampedScrollTop);
    this._loop();
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
    element = element || this.element;
    util.transform(value, element);
  }
});

const mouseScrollEvents = ['DOMMouseScroll', 'mousewheel'];

const handleScroll = (evt, target, preventDefault, scrollMultiplier) => {
  if (preventDefault) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      event.returnValue = false;
    }
  }

  var scrollAmount = evt.detail || (-evt.wheelDelta / 40); // convert wheelData to lines
  scrollAmount *= 19; // convert lines to pixels

  if (typeof scrollMultiplier === 'number' && !isNaN(scrollMultiplier))
    scrollAmount *= scrollMultiplier;

  if (evt.wheelDeltaX || ('axis' in evt && 'HORIZONTAL_AXIS' in evt && evt.axis == evt.HORIZONTAL_AXIS))
    // horizontal scroll
    if (target.scrollBy)
      target.scrollBy(scrollAmount, 0);
    else
      target.scrollLeft += scrollAmount;
  else // vertical scroll
    if (target.scrollBy)
      target.scrollBy(0, scrollAmount);
    else
      target.scrollTop += scrollAmount;
};

const RetargetMouseScroll = (elem, target, preventDefault, scrollMultiplier, preventRetarget) => {
  if (!elem)
    elem = document;

  if (!target)
    target = window;

  if (typeof preventDefault !== 'boolean')
    preventDefault = true;

  if (typeof preventRetarget !== 'function')
    preventRetarget = null;

  var addListener, removeListener, restoreFn,
  handler = function (evt) {
    evt = evt || window.event;
    if(preventRetarget && preventRetarget.call(this, evt)) return;
    handleScroll(evt, target, preventDefault, scrollMultiplier);
  };

  if (addListener = elem.addEventListener) {
    addListener.call(elem, mouseScrollEvents[0], handler, false);
    addListener.call(elem, mouseScrollEvents[1], handler, false);
  }
  else if (addListener = elem.attachEvent)
    addListener.call(elem, 'on'+mouseScrollEvents[1], handler);

  if (removeListener = elem.removeEventListener)
    restoreFn = function () {
      removeListener.call(elem, mouseScrollEvents[0], handler, false);
      removeListener.call(elem, mouseScrollEvents[1], handler, false);
    };
  else if (removeListener = elem.detachEvent)
    restoreFn = function () {
      removeListener.call(elem, 'on'+mouseScrollEvents[1], handler);
    };

  return {
    restore: restoreFn
  }
};

const FRONT_LAYER = '[class*="__bg-front"]';
const REAR_LAYER = '[class*="__bg-rear"]';

/**
 * blend-background effect
 */
const SCROLL_EFFECT_BLEND_BACKGROUND = {
  name: 'blend-background',
  setUp () {
    let frontLayer = this.element.querySelector(FRONT_LAYER);
    let rearLayer = this.element.querySelector(REAR_LAYER);
    const layers = [ frontLayer, rearLayer ];

    layers.map(layer => {
      if (layer) {
        if (layer.style.transform === '') {
          this._transform('translateZ(0)', layer);
          layer.style.willChange = 'opacity';
        }
      }
    });

    rearLayer.style.opacity = 0;
  },
  run (progress, top) {
    let frontLayer = this.element.querySelector(FRONT_LAYER);
    let rearLayer = this.element.querySelector(REAR_LAYER);

    frontLayer.style.opacity = (1 - progress).toFixed(5);
    rearLayer.style.opacity = progress.toFixed(5);
  }
};

const FRONT_LAYER$1 = '[class*="__bg-front"]';
const REAR_LAYER$1 = '[class*="__bg-rear"]';

/**
 * fade-background effect
 */
const SCROLL_EFFECT_FADE_BACKGROUND = {
  name: 'fade-background',
  setUp (config) {
    const duration = config.duration || '0.5s';
    const threshold = config.threshold || (this._isPositionedFixed ? 1 : 0.3);

    let frontLayer = this.element.querySelector(FRONT_LAYER$1);
    let rearLayer = this.element.querySelector(REAR_LAYER$1);
    const layers = [ frontLayer, rearLayer ];

    layers.map(layer => {
      if (layer) {
        let willChange = layer.style.willChange.split(',').map(c => c.trim()).filter(c => c.length);
        willChange.push('opacity', 'transform');
        layer.style.willChange = [...new Set(willChange)].join(', ');

        if (layer.style.transform === '') {
          this._transform('translateZ(0)', layer);
        }
        layer.style.transitionProperty = 'opacity';
        layer.style.transitionDuration = duration;
      }
    });

    this._fadeBackgroundThreshold = !this._isPositionedFixed 
      ? threshold + (this._progress * threshold) 
      : threshold;
  },
  tearDown () {
    delete this._fadeBackgroundThreshold;
  },
  run (progress, top) {
    let frontLayer = this.element.querySelector(FRONT_LAYER$1);
    let rearLayer = this.element.querySelector(REAR_LAYER$1);
    
    if (progress >= this._fadeBackgroundThreshold) {
      frontLayer.style.opacity = 0;
      rearLayer.style.opacity = 1;
    }
    else {
      frontLayer.style.opacity = 1;
      rearLayer.style.opacity = 0;
    }
  }
};

const FRONT_LAYER$2 = '[class*="__bg-front"]';
const REAR_LAYER$2 = '[class*="__bg-rear"]';
const BG = '[class$="__bg"]';

/**
 * parallax-background effect
 */
const SCROLL_EFFECT_PARALLAX_BACKGROUND = {
  name: 'parallax-background',
  setUp () {},
  tearDown () {
    let layers = [ 
      this.element.querySelector(FRONT_LAYER$2), 
      this.element.querySelector(REAR_LAYER$2)
    ];

    let props = ['marginTop', 'marginBottom'];

    layers.map(layer => {
      if (layer) {
        this._transform('translate3d(0, 0, 0)', layer);
        props.forEach((prop) => layer.style[prop] = '');
      }
    });
  },
  run (progress, top) {
    let unscrolledPercent = (this.scrollTarget.scrollHeight - this._scrollTargetHeight) / this.scrollTarget.scrollHeight;
    let distance = this.element.offsetHeight * unscrolledPercent;
    
    if (this._dHeight !== undefined) {
      unscrolledPercent = this._dHeight / this.element.offsetHeight;
      distance = this._dHeight * unscrolledPercent;
    }

    let scalar = 0.5;
    let delta = Math.abs(distance * scalar).toFixed(5);
    
    let max = this._isPositionedFixedEmulated ? 1000000 : distance;
    let deltaProgress = delta * progress;
    let transform = (Math.min(deltaProgress, max)).toFixed(5);

    let layers = [ 
      this.element.querySelector(FRONT_LAYER$2), 
      this.element.querySelector(REAR_LAYER$2)
    ];

    layers.map(layer => {
      if (layer) {
        layer.style['marginTop'] = `${ -1 * delta }px`;
        this._transform(`translate3d(0, ${ transform }px, 0)`, layer);
      }
    });

    let bgNode = this.element.querySelector(BG);
    if (!bgNode.style.visibility) {
      bgNode.style.visibility = 'visible';
    }
  }
};

// import effects

// export list
const SCROLL_EFFECTS = [
  SCROLL_EFFECT_BLEND_BACKGROUND,
  SCROLL_EFFECT_FADE_BACKGROUND,
  SCROLL_EFFECT_PARALLAX_BACKGROUND
];

/**
 * waterfall effect
 */
const HEADER_SCROLL_EFFECT_WATERFALL = {
  name: 'waterfall',
  setUp () {
    this._primary.classList.add('mdk-header--shadow');
  },
  run (progress, top) {
    this._primary.classList[this.isOnScreen() && this.isContentBelow() ? 'add' : 'remove']('mdk-header--shadow-show');
  },
  tearDown () {
    this._primary.classList.remove('mdk-header--shadow');
  }
};

const interpolate = (progress, points, fn, ctx) => {
  fn.apply(ctx, points.map(function (point) {
    return point[0] + (point[1] - point[0]) * progress
  }));
};

/**
 * fx-condenses effect
 * 
 * Transform properties of one or more designated header elements 
 * between two values based on the scroll position.
 */
const HEADER_SCROLL_EFFECT_FX_CONDENSES = {
  name: 'fx-condenses',
  setUp () {
    const elements = [ ...this.element.querySelectorAll('[data-fx-condenses]') ];
    const targets = [ ...this.element.querySelectorAll('[data-fx-id]') ];

    let bounds = {};

    elements.forEach(element => {
      if (element) {
        element.style.willChange = 'transform';
        this._transform('translateZ(0)', element);
        if (window.getComputedStyle(element).display === 'inline') {
          element.style.display = 'inline-block';
        }

        let id = element.getAttribute('id');
        if (!element.hasAttribute('id')) {
          id = 'rt' + (0 | Math.random() * 9e6).toString(36);
          element.setAttribute('id', id);
        }

        const bound = element.getBoundingClientRect();
        bounds[id] = bound;
      }
    });

    targets.forEach(target => {
      if (target) {
        let id = target.getAttribute('id');
        let fxId = target.getAttribute('data-fx-id');
        let fxEl = this.element.querySelector(`#${ fxId }`);

        let targetBounds = bounds[id];
        let fxBounds = bounds[fxId];

        const hasTextContent = target.textContent.trim().length > 0;
        let scale = 1;

        if (fxBounds !== undefined) {
          bounds[id].dx = targetBounds.left - fxBounds.left;
          bounds[id].dy = targetBounds.top - fxBounds.top;

          if (hasTextContent) {
            scale = parseInt(window.getComputedStyle(fxEl)['font-size'], 10) / 
            parseInt(window.getComputedStyle(target)['font-size'], 10);
          }
          else {
            scale = fxBounds.height / targetBounds.height;
          }
          bounds[id].scale = scale;
        }
      }
    });

    this._fxCondenses = {
      elements,
      targets,
      bounds
    };
  },
  run (progress, top) {
    let fx = this._fxCondenses;
    if (!this.condenses) {
      top = 0;
    }
    if (progress >= 1) {
      fx.elements.forEach(el => {
        if (el) {
          el.style.willChange = 'opacity';
          el.style.opacity = fx.targets.indexOf(el) !== -1 ? 0 : 1;
        }
      });
    }
    else {
      fx.elements.forEach(el => {
        if (el) {
          el.style.willChange = 'opacity';
          el.style.opacity = fx.targets.indexOf(el) !== -1 ? 1 : 0;
        }
      });
    }
    fx.targets.forEach(target => {
      if (target) {
        let id = target.getAttribute('id');
        interpolate(
          Math.min(1, progress), 
          [ [1, fx.bounds[id].scale], [0, -fx.bounds[id].dx], [top, top - fx.bounds[id].dy] ],
          (scale, translateX, translateY) => {
            target.style.willChange = 'transform';
            translateX = translateX.toFixed(5);
            translateY = translateY.toFixed(5);
            scale = scale.toFixed(5);
            this._transform(`translate(${ translateX }px, ${ translateY }px) scale3d(${ scale }, ${ scale }, 1)`, target);
          });  
      }
    });
  },
  tearDown () {
    delete this._fxCondenses;    
  }
};

// import effects

// export list
const HEADER_SCROLL_EFFECTS = [
  HEADER_SCROLL_EFFECT_WATERFALL,
  HEADER_SCROLL_EFFECT_FX_CONDENSES
];

const MODULE = 'mdk-header';
const CONTENT = `.${ MODULE }__content`;
const BG$1 = `.${ MODULE }__bg`;
const FRONT_LAYER$3 = `${ BG$1 }-front`;
const REAR_LAYER$3 = `${ BG$1 }-rear`;
const MODIFIER_FIXED = `${ MODULE }--fixed`;

/**
 * A container element for navigation and other content at the top 
 * of the screen with visual effects based on scroll position
 * 
 * @param  {HTMLElement} element
 * @return {Object}
 */
const headerComponent = (element) => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Collapse the header when scrolling down, leaving only the `[primary]` element visible.
     * If there is no `[primary]` element, the first child remains visibile.
     * @type {Object}
     */
    condenses: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Slides back the header when scrolling back up.
     * @type {Object}
     */
    reveals: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Mantains the header fixed at the top.
     * @type {Object}
     */
    fixed: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Disables all scroll effects.
     * @type {Object}
     */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    },

    retargetMouseScroll: {
      type: Boolean,
      reflectToAttribute: true,
      value: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_handleFixedPositionedScroll(scrollTarget)',
    '_reset(condenses, reveals, fixed)'
  ],

  /**
   * Event listeners
   * @type {Array}
   */
  listeners: [
    'window._debounceResize(resize)'
  ],

  /**
   * Compose mixins
   * @type {Array}
   */
  mixins: [
    scrollTargetBehavior(),
    scrollEffectBehavior()
  ],

  // A cached offsetHeight of the element
  _height: 0,

  // The distance in pixels the header will be translated to when scrolling
  _dHeight: 0,

  // The offsetTop of `_primary`
  _primaryTop: 0,

  // The element that remains visibile when the header condenses
  _primary: null,

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
   * Disables transform effects
   * @return {Boolean}
   */
  get transformDisabled () {
    return this.disabled || this.element.dataset.transformDisabled || !this._isPositionedFixedEmulated || !this.willCondense()
  },

  /**
   * Update `transform-disabled` attribute on `element`
   * @param  {Boolean}  value
   */
  set transformDisabled (value) {
    this.element[value ? 'setAttribute' : 'removeAttribute']('data-transform-disabled', 'data-transform-disabled');
  },

  /**
   * The distance the header is allowed to move away.
   * @return {number}
   */
  get _maxHeaderTop () {
    return this.fixed ? this._dHeight : this._height + 5
  },

  get _isPositionedFixedEmulated () {
    return this.fixed || this.condenses || this.reveals
  },

  get _isPositionedAbsolute () {
    return window.getComputedStyle(this.element).position === 'absolute'
  },

  get _primaryisPositionedFixed () {
    return window.getComputedStyle(this._primary).position === 'fixed'
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
   * Returns an object containing the progress value of the scroll
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
    let bgNode = this.element.querySelector(BG$1);
    if (!bgNode) {
      bgNode = document.createElement('DIV');
      this.element.insertBefore(bgNode, this.element.childNodes[0]);
      bgNode.classList.add(BG$1.substr(1));
    }

    [FRONT_LAYER$3, REAR_LAYER$3].map(className => {
      let bgNodeLayer = bgNode.querySelector(className);
      if (!bgNodeLayer) {
        bgNodeLayer = document.createElement('DIV');
        bgNode.appendChild(bgNodeLayer);
        bgNodeLayer.classList.add(className.substr(1));
      }
    });
  },

  _reset () {
    if (this.element.offsetWidth === 0 && this.element.offsetHeight === 0) {
      return
    }

    if (this._primaryisPositionedFixed) {
      this.element.style.paddingTop = this._primary.offsetHeight + 'px';
    }

    let scrollTop = this._clampedScrollTop;
    let firstSetup = this._height === 0 || scrollTop === 0;

    this._height = this.element.offsetHeight;
    this._primaryTop = this._primary ? this._primary.offsetTop : 0;
    this._dHeight = 0;
    
    if (this._mayMove()) {
      this._dHeight = this._primary ? this._height - this._primary.offsetHeight : 0;
    }
    
    this._setUpEffects();
    this._updateScrollState(firstSetup ? scrollTop : this._lastScrollTop, true);
  },

  /**
   * Pass MouseWheel events from the scroll target
   * when the header is fixed and the scroll target is not the document
   */
  _handleFixedPositionedScroll () {
    if (this._fixedPositionedScrollHandler !== undefined) {
      this._fixedPositionedScrollHandler.restore();
    }
    if (this._isValidScrollTarget() && this._isPositionedFixedEmulated && this.scrollTarget !== this._doc && this.retargetMouseScroll) {
      this._fixedPositionedScrollHandler = RetargetMouseScroll(this.element, this.scrollTarget);
    }
  },

  /**
   * Returns a reference to the element that remains visible when the header condenses.
   * @return {HTMLElement}
   */
  get _primary () {
    if (this._primaryElement) {
      return this._primaryElement
    }

    let primary;
    let nodes = this.element.querySelector(CONTENT).children;

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        let node = nodes[i];
        if (node.dataset.primary !== undefined) {
          primary = node;
          break
        }
        else if (!primary) {
          primary = node;
        }
      }
    }

    this._primaryElement = primary;
    return this._primaryElement
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

    if (!forceUpdate && scrollTop === this._lastScrollTop) {
      return
    }

    let progress = 0;
    let top = 0;
    let lastTop = this._top;
    let maxHeaderTop = this._maxHeaderTop;
    let dScrollTop = scrollTop - this._lastScrollTop;
    let absDScrollTop = Math.abs(dScrollTop);
    let isScrollingDown = scrollTop > this._lastScrollTop;
    let now = Date.now();

    if (this._mayMove()) {
      top = this._clamp(this.reveals ? lastTop + dScrollTop : scrollTop, 0, maxHeaderTop);
    }

    if (scrollTop >= this._dHeight) {
      top = this.condenses ? Math.max(this._dHeight, top) : top;
    }

    if (this.reveals && absDScrollTop < 100) {
      if (now - this._initTimestamp > 300 || this._wasScrollingDown !== isScrollingDown) {
        this._initScrollTop = scrollTop;
        this._initTimestamp = now;
      }
      if (scrollTop >= maxHeaderTop) {
        if (Math.abs(this._initScrollTop - scrollTop) > 30 || absDScrollTop > 10) {
          if (isScrollingDown && scrollTop >= maxHeaderTop) {
            top = maxHeaderTop;
          }
          else if (!isScrollingDown && scrollTop >= this._dHeight) {
            top = this.condenses ? this._dHeight : 0;
          }

          let scrollVelocity = dScrollTop / (now - this._lastTimestamp);
          this._revealTransitionDuration = this._clamp((top - lastTop) / scrollVelocity, 0, 300);
        }
        else {
          top = this._top;
        }
      }
    }

    if (this._dHeight === 0) {
      progress = scrollTop > 0 ? 1 : 0;
    }
    else {
      progress = top / this._dHeight;
    }

    if (!forceUpdate) {
      this._lastScrollTop = scrollTop;
      this._top = top;
      this._wasScrollingDown = isScrollingDown;
      this._lastTimestamp = now;
    }

    if (forceUpdate || progress !== this._progress || lastTop !== top || scrollTop === 0) {
      this._progress = progress;
      this._runEffects(progress, top);
      this._transformHeader(top);
    }
  },

  /**
   * Transforms the header.
   * @param  {number} top
   */
  _transformHeader (top) {
    if (this.transformDisabled) {
      return
    }

    if (this._isPositionedAbsolute) {
      let transform = top;
      if (this.scrollTarget === this._doc) {
        transform = 0;
      }

      if (top === transform) {
        this.element.style.willChange = 'transform';
        this._transform(`translate3d(0, ${ transform * -1 }px, 0)`);
      }

      if (top >= this._primaryTop) {
        this._primary.style.willChange = 'transform';
        this._transform(`translate3d(0, ${ Math.min(top, this._dHeight) - this._primaryTop }px, 0)`, this._primary);
      }
      return
    }

    if (this.fixed && this._isPositionedFixed) {
      let transform = top;

      this.element.style.willChange = 'transform';
      this._transform(`translate3d(0, ${ transform * -1 }px, 0)`);

      if (top >= this._primaryTop) {
        this._primary.style.willChange = 'transform';
        this._transform(`translate3d(0, ${ Math.min(top, this._dHeight) - this._primaryTop }px, 0)`, this._primary);
      }
      return
    }

    let transform = 0;
    let duration = `${ this._revealTransitionDuration }ms`;

    if (top > this._dHeight) {
      transform = -1 * (top - this._dHeight);

      if (this.reveals) {
        duration = '0ms';
      }
    }
    if (this.reveals) {
      this._primary.style.transitionDuration = duration;
    }
    this._primary.style.willChange = 'transform';
    this._transform(`translate3d(0, ${ transform }px, 0)`, this._primary);
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
  },

  /**
   * Handle the resize event every 50ms
   */
  _debounceResize () {
    clearTimeout(this._onResizeTimeout);
    if (this._resizeWidth !== window.innerWidth) {
      this._onResizeTimeout = setTimeout(() => {
        this._resizeWidth = window.innerWidth;
        this._reset();
      }, 50);
    }
  },

  /**
   * Initialize component
   */
  init () {
    this._resizeWidth = window.innerWidth;

    this.attachToScrollTarget();
    this._handleFixedPositionedScroll();
    this._setupBackgrounds();

    this._primary.setAttribute('data-primary', 'data-primary');
    this._primary.classList[(this.fixed || this.condenses) ? 'add' : 'remove'](MODIFIER_FIXED);

    SCROLL_EFFECTS.concat(HEADER_SCROLL_EFFECTS).map(effect => this.registerEffect(effect.name, effect));
  },

  /**
   * Destroy component
   */
  destroy () {
    clearTimeout(this._onResizeTimeout);
    this.detachFromScrollTarget();
  }
});

handler.register(MODULE, headerComponent);

/**
 * A wrapper element that positions a Header and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */
const headerLayoutComponent = () => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * If true, defines it's own scrolling region, otherwise uses the document scroll.
     * @type {Object}
     */
    hasScrollingRegion: {
      type: Boolean,
      reflectToAttribute: true
    },

    fullbleed: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_updateScroller(hasScrollingRegion)',
    '_updateContentPosition(hasScrollingRegion, header.fixed, header.condenses)',
    '_updateDocument(fullbleed)'
  ],

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'window._debounceResize(resize)'
  ],

  /**
   * The header layout content wrapper HTMLElement
   * @return {HTMLElement}
   */
  get contentContainer () {
    return this.element.querySelector('.mdk-header-layout__content')
  },

  /**
   * A reference to the header component
   * @return {Object}
   */
  get header () {
    const headerNode = this.element.querySelector('.mdk-header');
    if (headerNode) {
      return headerNode.mdkHeader
    }
  },

  _updateScroller () {
    this.header.scrollTargetSelector = this.hasScrollingRegion ? this.contentContainer : null;
  },

  _updateContentPosition () {
    const headerHeight = this.header.element.offsetHeight;
    const gutter = parseInt(window.getComputedStyle(this.header.element).marginBottom, 10);
    const containerStyle = this.contentContainer.style;
    
    if (this.header.fixed || this.header.willCondense()) {
      containerStyle.paddingTop = `${ headerHeight + gutter }px`;
      containerStyle.marginTop = '';
    }
  },

  /**
   * Handle the resize event every 50ms
   */
  _debounceResize () {
    clearTimeout(this._onResizeTimeout);
    if (this._resizeWidth !== window.innerWidth) {
      this._onResizeTimeout = setTimeout(() => {
        this._resizeWidth = window.innerWidth;
        this._reset();
      }, 50);
    }
  },

  _updateDocument () {
    const docElements = [...document.querySelectorAll('html, body')];
    if (this.fullbleed) {
      docElements.forEach(el => {
        el.style.height = '100%';
      });
    }
  },

  _reset () {
    this._updateContentPosition();
  },

  /**
   * Initialize component
   */
  init () {
    this._resizeWidth = window.innerWidth;
    this._updateDocument();
    this._updateScroller();
  },

  /**
   * Destroy component
   */
  destroy () {
    clearTimeout(this._onResizeTimeout);

    const docElements = [...document.querySelectorAll('html, body')];
    docElements.forEach(el => {
      // fullbleed
      el.style.height = '';
    });
  }
});

handler.register('mdk-header-layout', headerLayoutComponent);

const MODULE$1 = 'mdk-box';
const BG$2 = `.${ MODULE$1 }__bg`;
const FRONT_LAYER$4 = `${ BG$2 }-front`;
const REAR_LAYER$4 = `${ BG$2 }-rear`;

/**
 * A container element for generic content with visual effects based on scroll position
 * @param  {HTMLElement} element
 * @return {Object}
 */
const boxComponent = (element) => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Disables effects
     */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'window._debounceResize(resize)'
  ],

  /**
   * Compose mixins
   * @type {Array}
   */
  mixins: [
    scrollTargetBehavior(),
    scrollEffectBehavior()
  ],

  // The current scroll progress
  _progress: 0,

  /**
   * Returns true if the element is visible in the current viewport.
   * @return {Boolean}
   */
  isOnScreen () {
    return this._elementTop < this._scrollTop + this._scrollTargetHeight && 
      this._elementTop + this.element.offsetHeight > this._scrollTop
  },

  isVisible () {
    return this.element.offsetWidth > 0 && this.element.offsetHeight > 0
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
    let bgNode = this.element.querySelector(BG$2);
    if (!bgNode) {
      bgNode = document.createElement('DIV');
      this.element.insertBefore(bgNode, this.element.childNodes[0]);
      bgNode.classList.add(BG$2.substr(1));
    }

    [FRONT_LAYER$4, REAR_LAYER$4].map(className => {
      let bgNodeLayer = bgNode.querySelector(className);
      if (!bgNodeLayer) {
        bgNodeLayer = document.createElement('DIV');
        bgNode.appendChild(bgNodeLayer);
        bgNodeLayer.classList.add(className.substr(1));
      }
    });
  },

  _getElementTop () {
    let currentNode = this.element;
    let top = 0;

    while (currentNode && currentNode !== this.scrollTarget) {
      top += currentNode.offsetTop;
      currentNode = currentNode.offsetParent;
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
      let target = Math.min(this._scrollTargetHeight, this._elementTop + this.element.offsetHeight);
      let viewportTop = this._elementTop - scrollTop;
      let progress = 1 - (viewportTop + this.element.offsetHeight) / target;

      this._progress = progress;
      this._runEffects(this._progress, scrollTop);
    }
  },

  /**
   * Handle the resize event every 50ms
   */
  _debounceResize () {
    clearTimeout(this._onResizeTimeout);
    if (this._resizeWidth !== window.innerWidth) {
      this._onResizeTimeout = setTimeout(() => {
        this._resizeWidth = window.innerWidth;
        this._reset();
      }, 50);
    }
  },

  /**
   * Initialize component
   */
  init () {
    this._resizeWidth = window.innerWidth;

    this.attachToScrollTarget();
    this._setupBackgrounds();
    
    SCROLL_EFFECTS.map(effect => this.registerEffect(effect.name, effect));
  },

  _reset () {
    this._elementTop = this._getElementTop();
    this._setUpEffects();
    this._updateScrollState(this._clampedScrollTop);
  },

  /**
   * Destroy component
   */
  destroy () {
    clearTimeout(this._onResizeTimeout);
    this.detachFromScrollTarget();
  }
});

handler.register(MODULE$1, boxComponent);

let isRTLIntv;

/**
 * A navigation drawer that can slide in from the left or right
 * @param  {HTMLElement} element
 * @return {Object}
 */
const drawerComponent = () => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {
    
    /**
     * The opened state of the drawer.
     * @type {Object}
     */
    opened: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * The drawer does not have a scrim.
     * @type {Object}
     */
    persistent: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * The alignment of the drawer on the screen ('left', 'right', 'start' or 'end').
     * 'start' computes to left and 'end' to right in LTR and RTL layouts.
     * @type {Object}
     */
    align: {
      reflectToAttribute: true,
      value: 'start'
    },

    /**
     * The computed drawer position on the screen ('left' or 'right').
     * @type {Object}
     */
    position: {
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_resetPosition(align, _isRTL)',
    '_fireChange(opened, persistent, align, position)',
    '_onChangedState(_drawerState)',
    '_onClose(opened)'
  ],

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    '_onTransitionend(transitionend)',
    'scrim._onClickScrim(click)'
  ],

  // The current drawer state
  _drawerState: 0,

  // Possible drawer states
  _DRAWER_STATE: {
    INIT: 0,
    OPENED: 1,
    OPENED_PERSISTENT: 2,
    CLOSED: 3
  },

  _isRTL: false,

  /**
   * The drawer content HTMLElement
   * @return {HTMLElement}
   */
  get contentContainer () {
    return this.element.querySelector('.mdk-drawer__content')
  },

  /**
   * The drawer scrim HTMLElement
   * @return {HTMLElement}
   */
  get scrim () {
    let scrim = this.element.querySelector('.mdk-drawer__scrim');
    if (!scrim) {
      scrim = document.createElement('DIV');
      this.element.insertBefore(scrim, this.element.childNodes[0]);
      scrim.classList.add('mdk-drawer__scrim');
    }
    return scrim
  },

  /**
   * Get the width of the drawer.
   * @return {String}
   */
  getWidth () {
    return this.contentContainer.offsetWidth
  },

  /**
   * Toggles the drawer opened state.
   */
  toggle () {
    this.opened = !this.opened;
  },

  /**
   * Closes the drawer.
   */
  close () {
    this.opened = false;
  },

  /**
   * Opens the drawer.
   */
  open () {
    this.opened = true;
  },

  _onClose (opened) {
    if (!opened) {
      this.element.setAttribute('data-closing', true);
    }
  },

  _setTransitionDuration (duration) {
    this.contentContainer.style.transitionDuration = duration;
    this.scrim.style.transitionDuration = duration;
  },

  _resetDrawerState () {
    let oldState = this._drawerState;
    if (this.opened) {
      this._drawerState = this.persistent 
        ? this._DRAWER_STATE.OPENED_PERSISTENT : this._DRAWER_STATE.OPENED;
    }
    else {
      this._drawerState = this._DRAWER_STATE.CLOSED;
    }

    if (oldState !== this._drawerState) {
      if (!this.opened) {
        this.element.removeAttribute('data-closing');
      }
      if (this._drawerState === this._DRAWER_STATE.OPENED) {
        document.body.style.overflow = 'hidden';
      }
      else {
        document.body.style.overflow = '';
      }
    }
  },

  _resetPosition () {
    switch (this.align) {
      case 'start':
        this.position = this._isRTL ? 'right' : 'left';
        return
      case 'end':
        this.position = this._isRTL ? 'left' : 'right';
        return
    }
    this.position = this.align;
  },

  _fireChange () {
    this.fire('mdk-drawer-change');
  },

  _fireChanged () {
    this.fire('mdk-drawer-changed');
  },

  _onTransitionend (event) {
    let target = event.target;
    if (target === this.contentContainer || target === this.scrim) {
      this._resetDrawerState();
    }
  },

  _onClickScrim (event) {
    event.preventDefault();
    this.close();
  },

  _onChangedState (newState, oldState) {
    if (oldState !== this._DRAWER_STATE.INIT) {
      this._fireChanged();
    }
  },

  destroy() {
    clearInterval(isRTLIntv);
  },

  /**
   * Initialize component
   */
  init () {
    isRTLIntv = setInterval(() => this._isRTL = window && window.getComputedStyle(this.element).direction === 'rtl', 100);
    this._resetPosition();
    this._setTransitionDuration('0s');

    setTimeout(() => {
      this._setTransitionDuration('');
      this._resetDrawerState();
    }, 0);
  }
});

handler.register('mdk-drawer', drawerComponent);

/**
 * Bind to a CSS media query
 * @param  {String} query The CSS media query
 * @return {Object}
 */
const mediaQuery = (query) => {
  let mediaQuery = {

    // The CSS media query
    query,

    // CSS media query matches
    queryMatches: null,

    _reset () {
      this._removeListener();
      this.queryMatches = null;
      if (!this.query) {
        return
      }
      this._mq = window.matchMedia(this.query);
      this._addListener();
      this._handler(this._mq);
    },

    _handler (mq) {
      this.queryMatches = mq.matches;
    },

    _addListener () {
      if (this._mq) {
        this._mq.addListener(this._handler);
      }
    },

    _removeListener () {
      if (this._mq) {
        this._mq.removeListener(this._handler);
      }
      this._mq = null;
    },

    /**
     * Initialize mediaQuery
     */
    init () {
      watchObject.watch(this, 'query', this._reset);
      this._reset();
    },

    /**
     * Destroy mediaQuery
     * @return {[type]} [description]
     */
    destroy () {
      watchObject.unwatch(this, 'query', this._reset);
      this._removeListener();
    }
  };

  // Bind handlers
  mediaQuery._reset = mediaQuery._reset.bind(mediaQuery);
  mediaQuery._handler = mediaQuery._handler.bind(mediaQuery);

  // Initialize mediaQuery
  mediaQuery.init();

  return mediaQuery
};

// IE9+ Element.matches polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

/**
 * A wrapper element that positions a Drawer and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */
const drawerLayoutComponent = () => ({
  
  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Ignore the `responsiveWidth` option and force the narrow layout on any screen size.
     * @type {Object}
     */
    forceNarrow: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * The maximum viewport width for which the narrow layout is enabled.
     * @type {Object}
     */
    responsiveWidth: {
      reflectToAttribute: true,
      value: '554px'
    },

    /**
     * If true, defines it's own scrolling region, otherwise uses the document scroll.
     * @type {Object}
     */
    hasScrollingRegion: {
      type: Boolean,
      reflectToAttribute: true
    },

    fullbleed: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_resetLayout(narrow, forceNarrow)',
    '_onQueryMatches(mediaQuery.queryMatches)',
    '_updateScroller(hasScrollingRegion)',
    '_updateDocument(fullbleed)'
  ],
  
  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'drawer._onDrawerChange(mdk-drawer-change)'
  ],

  // The default `narrow` value
  _narrow: null,

  // The mediaQuery listener
  _mediaQuery: null,

  /**
   * The mediaQuery listener
   * @return {Object}
   */
  get mediaQuery () {
    if (!this._mediaQuery) {
      this._mediaQuery = mediaQuery(this.responsiveMediaQuery); 
    }
    return this._mediaQuery
  },

  /**
   * Returns true if the narrow layout is enabled.
   * @return {Boolean}
   */
  get narrow () {
    return this.forceNarrow ? true : this._narrow
  },

  /**
   * Toggle the narrow layout.
   * @param  {Boolean} value
   */
  set narrow (value) {
    this._narrow = !value && this.forceNarrow ? true : value;
  },

  /**
   * The HTMLElement for the layout content
   * @return {HTMLElement}
   */
  get contentContainer () {
    return this.element.querySelector('.mdk-drawer-layout__content')
  },

  get drawerNode () {
    let drawerNode;
    try {
      drawerNode = Array.from(this.element.children).find(e => e.matches('.mdk-drawer'));
    } catch(e) {
      console.error(e.message, e.stack);
    }
    if (drawerNode) {
      return drawerNode
    }
  },

  /**
   * The drawerComponent
   * @return {Object} A reference to the drawer component.
   */
  get drawer () {
    if (this.drawerNode) {
      return this.drawerNode.mdkDrawer
    }
  },

  /**
   * Computed media query value passed to the mediaQuery listener
   * @return {String}
   */
  get responsiveMediaQuery () {
    return this.forceNarrow ? '(min-width: 0px)' : `(max-width: ${ this.responsiveWidth })`
  },

  _updateDocument () {
    const docElements = [...document.querySelectorAll('html, body')];
    if (this.fullbleed) {
      docElements.forEach(el => {
        el.style.height = '100%';
      });
    }
  },

  _updateScroller () {
    const docElements = [...document.querySelectorAll('html, body')];
    if (this.hasScrollingRegion) {
      docElements.forEach(el => {
        el.style.overflow = 'hidden';
        el.style.position = 'relative';
      });
    }
  },

  _resetLayout () {
    this.drawer.opened = this.drawer.persistent = !this.narrow;
    this._onDrawerChange();
  },

  _resetPush () {
    let drawer = this.drawer;
    let drawerWidth = this.drawer.getWidth();
    let contentContainer = this.contentContainer;

    if (drawer.opened) {
      util.transform('translate3d(0, 0, 0)', contentContainer);
      return
    }

    let transform = (this.element.offsetWidth - contentContainer.offsetWidth) / 2;
    transform = drawer.position === 'right' ? transform : transform * -1;

    util.transform(`translate3d(${ transform }px, 0, 0)`, contentContainer);
  },

  _setContentTransitionDuration (duration) {
    this.contentContainer.style.transitionDuration = duration;
  },

  _onDrawerChange () {
    this._resetPush();
  },

  _onQueryMatches (value) {
    this.narrow = value;
  },

  /**
   * Initialize component
   */
  init () {
    // Initial render
    this._setContentTransitionDuration('0s');
    setTimeout(() => this._setContentTransitionDuration(''), 0);

    this._updateDocument();
    this._updateScroller();

    if (this.drawerNode) {
      // Initialize mediaQuery
      this.mediaQuery.init();
    }
  },

  /**
   * Destroy component
   */
  destroy () {
    this.mediaQuery.destroy();

    const docElements = [...document.querySelectorAll('html, body')];
    docElements.forEach(el => {
      // fullbleed
      el.style.height = '';
      // has-scrolling-region
      el.style.overflow = '';
      el.style.position = '';
    });
  }
});

handler.register('mdk-drawer-layout', drawerLayoutComponent);

/**
 * A content area that reveals on user interaction.
 * @param  {HTMLElement} element
 * @return {Object}
 */
const revealComponent = () => ({
  
  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Partially revealed size.
     * @type {Object}
     */
    partialHeight: {
      reflectToAttribute: true,
      type: Number,
      value: 0
    },

    /**
     * Always revealed.
     * @type {Object}
     */
    forceReveal: {
      type: Boolean,
      reflectToAttribute: true
    },

    /**
     * Toggle reveal on click/mouseenter/mouseleave or touchstart/touchend.
     * click|hover
     * @type {Object}
     */
    trigger: {
      value: 'click',
      reflectToAttribute: true
    },

    /**
     * The opened state.
     * @type {Object}
     */
    opened: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Property change observers.
   * @type {Array}
   */
  observers: [
    '_onChange(opened)'
  ],

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    '_onEnter(mouseenter, touchstart)',
    '_onLeave(mouseleave, touchend)',
    'window._debounceResize(resize)',
    '_onClick(click)',
  ],

  /**
   * Revealable element.
   * @return {HTMLElement}
   */
  get reveal () {
    return this.element.querySelector('.mdk-reveal__content')
  },

  /**
   * Partial mask element.
   * @return {HTMLElement}
   */
  get partial () {
    let partial = this.reveal.querySelector('.mdk-reveal__partial');
    if (!partial) {
      partial = document.createElement('DIV');
      partial.classList.add('mdk-reveal__partial');
      this.reveal.insertBefore(partial, this.reveal.childNodes[0]);
    }
    return partial
  },

  /**
   * Open the revealable element.
   */
  open () {
    this.opened = true;
  },

  /**
   * Close the revealable element.
   */
  close () {
    this.opened = false;
  },

  /**
   * Toggle the opened state.
   */
  toggle () {
    this.opened = !this.opened;
  },

  /**
   * Set the initial state.
   * Gets called automatically on `window.load`
   */
  _reset () {
    this._translate = 'translateY(' + (-1 * (this.reveal.offsetHeight - this.partialHeight)) + 'px)';
    
    if (this.partialHeight !== 0) {
      this.partial.style.height = this.partialHeight + 'px';
    }

    this.element.style.height = this.reveal.offsetTop + this.partialHeight + 'px';

    if (this.forceReveal && !this.opened) {
      this.open();
    }
  },

  _onChange () {
    util.transform(this.opened ? this._translate : 'translateY(0)', this.reveal);
  },

  /**
   * Handle `mouseenter` and `touchstart` events.
   * @param  {MouseEvent|TouchEvent} event
   */
  _onEnter () {
    if (this.trigger === 'hover' && !this.forceReveal) {
      this.open();
    }
  },

  /**
   * Handle `click` event.
   * @param  {MouseEvent|TouchEvent} event
   */
  _onClick () {
    if (this.trigger === 'click') {
      this.toggle();
    }
  },

  /**
   * Handle `mouseleave` and `touchend` events.
   * @param  {MouseEvent|TouchEvent} event
   */
  _onLeave () {
    if (this.trigger === 'hover' && !this.forceReveal) {
      this.close();
    }
  },

  /**
   * Debounce `window.resize` handler.
   */
  _debounceResize () {
    clearTimeout(this._debounceResizeTimer);
    this._debounceResizeTimer = setTimeout(() => {
      if (this._resizeWidth !== window.innerWidth) {
        this._resizeWidth = window.innerWidth;
        this._reset();
      }
    }, 50);
  },

  /**
   * Initialize component.
   */
  init () {
    this._resizeWidth = window.innerWidth;
  },

  /**
   * Destroy component.
   */
  destroy () {
    clearTimeout(this._debounceResizeTimer);
  }
});

handler.register('mdk-reveal', revealComponent);

const isTouch = () => ('ontouchstart' in window);

const matrixValues = (matrix) => {
  if (matrix === 'none') {
    matrix = 'matrix(0,0,0,0,0)';
  }
  var obj = {};
  var values = matrix.match(/([-+]?[\d\.]+)/g);
  obj.translate = {
    x: parseInt(values[4], 10) || 0,
    y: parseInt(values[5], 10) || 0
  };
  return obj
};

const transformMatrix = (el) => {
  var st = window.getComputedStyle(el, null);
  var matrix = st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform');

  return matrixValues(matrix)
};

/**
 * Compute the pointer coordinates from multiple event types.
 * @param  {TouchEvent|MouseEvent} event
 */
const pointer = (event) => {
  event = event.originalEvent || event || window.event;
  event = event.touches && event.touches.length 
    ? event.touches[0] 
    : event.changedTouches && event.changedTouches.length
      ? event.changedTouches[0] 
      : event;

  return {
    x: event.pageX ? event.pageX : event.clientX,
    y: event.pageY ? event.pageY : event.clientY
  }
};

/**
 * Compute the difference between the properties of two objects.
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
const difference = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  }
};

/**
 * A Carousel component for cycling through elements.
 * @param  {HTMLELement} element
 * @return {Object}
 */
const carouselComponent = () => ({

  properties: {
    autoStart: {
      type: Boolean,
      reflectToAttribute: true
    },
    interval: {
      type: Number,
      reflectToAttribute: true,
      value: 3000
    }
  },

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    '_onEnter(mouseenter)',
    '_onLeave(mouseleave)',
    '_onTransitionend(transitionend)',
    '_onDragStart(mousedown, touchstart)',
    '_onMouseDrag(dragstart, selectstart)',
    'document._onDragMove(mousemove, touchmove)',
    'document._onDragEnd(mouseup, touchend)',
    'window._debounceResize(resize)'
  ],

  // The carousel items
  _items: [],

  // The carousel moving state
  _isMoving: false,

  // A reference to the carousel content container
  _content: null,

  // A reference to the active item
  _current: null,

  // Drag and touch state
  _drag: {},

  /**
   * Set the initial state. 
   * Gets called automatically on `window.load`.
   */
  _reset () {
    this._content = this.element.querySelector('.mdk-carousel__content');
    this._items = [...this._content.children];

    this._content.style.width = '';
    this._items.forEach(function (item) {
      item.style.width = '';
    });

    var width = this.element.offsetWidth;
    var itemWidth = this._items[0].offsetWidth;
    var visible = width / itemWidth;
    
    this._itemWidth = itemWidth;
    this._visible = Math.round(visible);
    this._max = this._items.length - this._visible;

    this.element.style.overflow = 'hidden';
    this._content.style.width = (itemWidth * this._items.length) + 'px';
    
    this._items.forEach(function (item) {
      item.classList.add('mdk-carousel__item');
      item.style.width = itemWidth + 'px';
    });

    if (!this._current) {
      this._current = this._items[0];
    }

    if (this._items.length < 2) {
      return
    }

    var currentIndex = this._items.indexOf(this._current);

    this._transform(currentIndex * itemWidth * -1, 0);

    if (this.autoStart) {
      this.start();
    }
  },

  /**
   * Start sliding the carousel on a time interval.
   */
  start () {
    this.stop();

    if (this._items.length < 2 || this._items.length <= this._visible) {
      return
    }
    this._setContentTransitionDuration('');
    this._interval = setInterval(this.next.bind(this), this.interval);
  },

  /**
   * Stop sliding the carousel on a time interval.
   */
  stop () {
    clearInterval(this._interval);
    this._interval = null;
  },

  /**
   * Move the carousel forward by one item.
   */
  next () {
    if (this._items.length < 2 || this._isMoving || document.hidden || !this._isOnScreen()) {
      return
    }

    var currentIndex = this._items.indexOf(this._current);
    var nextIndex = this._items[currentIndex + 1] !== undefined 
      ? currentIndex + 1 : 0;
    var remaining = this._items.length - currentIndex;

    if (remaining === this._visible) {
      nextIndex = 0;
    }

    this._to(nextIndex);
  },

  /**
   * Move the carousel backward by one item.
   */
  prev () {
    if (this._items.length < 2 || this._isMoving) {
      return
    }

    var currentIndex = this._items.indexOf(this._current);
    var prevIndex = this._items[currentIndex - 1] !== undefined 
      ? currentIndex - 1 : this._items.length;
    this._to(prevIndex);
  },

  _transform (translate, duration, callback) {
    if (duration !== undefined) {
      this._setContentTransitionDuration(duration + 'ms');
    }
    var matrix = transformMatrix(this._content);
    if (matrix.translate.x === translate) {
      if (typeof callback === 'function') {
        callback.call(this);
      }
    }
    else {
      requestAnimationFrame(function () {
        if (duration !== 0) {
          this._isMoving = true;
        }
        util.transform('translate3d(' + translate + 'px, 0, 0)', this._content);

        if (typeof callback === 'function') {
          callback.call(this);
        }
      }.bind(this));
    }
  },

  /**
   * Slide to a specific item by index.
   * @param  {Number} index
   */
  _to (index) {
    if (this._items.length < 2 || this._isMoving) {
      return
    }

    if (index > this._max) {
      index = this._max;
    }
    if (index < 0) {
      index = 0;
    }

    var translate = index * this._itemWidth * -1;

    this._transform(translate, false, function () {
      this._current = this._items[index];
    });
  },

  /**
   * `window.resize` debounce handler.
   */
  _debounceResize () {
    clearTimeout(this._resizeTimer);
    if (this._resizeWidth !== window.innerWidth) {
      this._resizeTimer = setTimeout(function () {
        this._resizeWidth = window.innerWidth;
        this.stop();
        this._reset();
      }.bind(this), 50);
    }
  },

  _setContentTransitionDuration (duration) {
    this._content.style.transitionDuration = duration;
  },

  /**
   * Stop the carousel auto sliding on `mouseenter`.
   */
  _onEnter () {
    this.stop();
  },

  /**
   * (Re)start the carousel auto sliding on `mouseleave`.
   */
  _onLeave () {
    if (!this._drag.wasDragging && this.autoStart) {
      this.start();
    }
  },

  /**
   * Handle `transitionend` events
   * @param  {TransitionEvent} event
   */
  _onTransitionend () {
    this._isMoving = false;
  },

  /**
   * Handle `mousedown` and `touchstart` events
   * @param  {MouseEvent|TouchEvent} event
   */
  _onDragStart (event) {
    if (this._drag.isDragging || this._isMoving || event.which === 3) {
      return
    }

    this.stop();
    var stage = transformMatrix(this._content).translate;

    this._drag.isDragging = true;
    this._drag.isScrolling = false;
    this._drag.time = new Date().getTime();
    this._drag.start = stage;
    this._drag.current = stage;
    this._drag.delta = {
      x: 0,
      y: 0
    };

    this._drag.pointer = pointer(event);
    this._drag.target = event.target;
  },

  /**
   * Handle `mousemove` and `touchmove` events
   * @param  {MouseEvent|TouchEvent} event
   */
  _onDragMove (event) {
    if (!this._drag.isDragging) {
      return
    }

    var delta = difference(this._drag.pointer, pointer(event));
    var stage = difference(this._drag.start, delta);
    var isScrolling = isTouch() && Math.abs(delta.x) < Math.abs(delta.y);

    if (!isScrolling) {
      event.preventDefault();
      this._transform(stage.x, 0);
    }

    this._drag.delta = delta;
    this._drag.current = stage;
    this._drag.isScrolling = isScrolling;
    this._drag.target = event.target;
  },

  /**
   * Handle `mouseup` and `touchend` events
   * @param  {MouseEvent|TouchEvent} event
   */
  _onDragEnd (event) {
    if (!this._drag.isDragging) {
      return
    }

    this._setContentTransitionDuration('');
    
    this._drag.duration = new Date().getTime() - this._drag.time;

    var dx = Math.abs(this._drag.delta.x);
    var change = dx > 20 || dx > this._itemWidth / 3;
    var factor = Math.max(Math.round(dx / this._itemWidth), 1);
    var next = this._drag.delta.x > 0;

    if (change) {
      var currentIndex = this._items.indexOf(this._current);
      var index = next ? currentIndex + factor : currentIndex - factor;
      this._to(index);
    }
    else {
      this._transform(this._drag.start.x);
    }

    this._drag.isDragging = false;
    this._drag.wasDragging = true;
  },

  /**
   * Prevent and stop the default actions on text selection and dragging elements
   * @param  {Event|DragEvent} event
   */
  _onMouseDrag (event) {
    event.preventDefault();
    event.stopPropagation();
  },

  /**
   * Determine if the carousel is currently in the visibile viewport.
   * @return {Boolean}
   */
  _isOnScreen () {
    var rect = this.element.getBoundingClientRect();
    return rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
  },

  /**
   * Initialize the carousel.
   */
  init () {
    this._resizeWidth = window.innerWidth;
    this._reset();
  },

  /**
   * Destroy the carousel.
   */
  destroy () {
    this.stop();
    clearTimeout(this._resizeTimer);
  }
});

handler.register('mdk-carousel', carouselComponent);

/**
 * @param  {HTMLElement} element
 * @return {Object}
 */
const tooltipComponent = (element) => ({

  /**
   * Public properties.
   * @type {Object}
   */
  properties: {

    /**
     * Attaches the tooltip to an element.
     * @type {Object}
     */
    for: {
      readOnly: true,
      value () {
        var target = this.element.getAttribute('data-for');
        return document.querySelector('#' + target)
      }
    },

    position: {
      reflectToAttribute: true,
      value: 'bottom'
    },

    opened: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  /**
   * Event listeners.
   * @type {Array}
   */
  listeners: [
    'for.show(mouseenter, touchstart)',
    'for.hide(mouseleave, touchend)',
    'window._debounceResize(resize)'
  ],

  observers: [
    '_reset(position)'
  ],

  mixins: [
    scrollTargetBehavior()
  ],

  /**
   * A reference to the drawer layout.
   * @return {Object}
   */
  get drawerLayout () {
    const layoutNode = document.querySelector('.mdk-js-drawer-layout');
    if (layoutNode) {
      return layoutNode.mdkDrawerLayout
    }
  },

  _reset () {
    this.element.removeAttribute('style');

    var props = this.for.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var top = props.top + (props.height / 2);
    var marginLeft = -1 * (this.element.offsetWidth / 2);
    var marginTop = -1 * (this.element.offsetHeight / 2);

    if (this.position === 'left' || this.position === 'right') {
      if (top + marginTop < 0) {
        this.element.style.top = '0';
        this.element.style.marginTop = '0';
      } 
      else {
        this.element.style.top = top + 'px';
        this.element.style.marginTop = marginTop + 'px';
      }
    }
    else if (left + marginLeft < 0) {
      this.element.style.left = '0';
      this.element.style.marginLeft = '0';
    } 
    else {
      this.element.style.left = left + 'px';
      this.element.style.marginLeft = marginLeft + 'px';
    }

    if (this.position === 'top') {
      this.element.style.top = props.top - this.element.offsetHeight - 10 + 'px';
    } 
    else if (this.position === 'right') {
      this.element.style.left = props.left + props.width + 10 + 'px';
    } 
    else if (this.position === 'left') {
      this.element.style.left = props.left - this.element.offsetWidth - 10 + 'px';
    } 
    else {
      this.element.style.top = props.top + props.height + 10 + 'px';
    }
  },

  _debounceResize () {
    clearTimeout(this._debounceResizeTimer);
    this._debounceResizeTimer = setTimeout(() => {
      if (window.innerWidth !== this._debounceResizeWidth) {
        this._debounceResizeWidth = window.innerWidth;
        this._reset();
      }
    }, 50);
  },

  /**
   * Overrides `scrollTargetBehavior._scrollHandler`
   */
  _scrollHandler () {
    clearTimeout(this._debounceScrollTimer);
    this._debounceScrollTimer = setTimeout(this._reset.bind(this), 50);
  },

  show () {
    // this.element.style.transform = 'scale(1)'
    this.opened = true;
  },

  hide () {
    // this.element.style.transform = 'scale(0)'
    this.opened = false;
  },

  toggle () {
    this.opened = !this.opened;
  },

  /**
   * Initialize component.
   */
  init () {
    document.body.appendChild(this.element);
    this._debounceResizeWidth = window.innerWidth;

    this.attachToScrollTarget();
    this._reset();

    if (this.drawerLayout && this.drawerLayout.hasScrollingRegion) {
      this.scrollTargetSelector = this.drawerLayout.contentContainer;
    }
  },

  /**
   * Destroy component.
   */
  destroy () {
    clearTimeout(this._debounceResizeTimer);
    clearTimeout(this._debounceScrollTimer);

    this.detachFromScrollTarget();
  }
});

handler.register('mdk-tooltip', tooltipComponent);

export { HEADER_SCROLL_EFFECTS, SCROLL_EFFECTS, boxComponent, carouselComponent, drawerComponent, drawerLayoutComponent, headerComponent, headerLayoutComponent, mediaQuery, revealComponent, scrollEffectBehavior, scrollTargetBehavior, tooltipComponent };
