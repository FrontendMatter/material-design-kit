import { watch, unwatch } from 'watch-object';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.string.split';
import 'core-js/modules/web.dom-collections.for-each';
import _typeof from '@babel/runtime/helpers/typeof';
import { util, handler } from 'dom-factory';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.function.name';
import 'core-js/modules/es.string.fixed';
import _defineEnumerableProperties from '@babel/runtime/helpers/defineEnumerableProperties';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { RetargetMouseScroll } from 'retarget-mouse-scroll';
import 'core-js/modules/es.number.to-fixed';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.array.join';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.set';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/es.string.trim';
import 'core-js/modules/web.dom-collections.iterator';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import 'core-js/modules/es.array.index-of';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/es.array.find';
import 'core-js/modules/es.array.from';
import 'core-js/modules/es.number.constructor';
import 'core-js/modules/es.string.match';

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

var scrollTargetBehavior = function scrollTargetBehavior() {
  return {
    // The scroll target selector
    _scrollTargetSelector: null,
    // The scroll target HTMLElement
    _scrollTarget: null,

    /**
     * Get the HTMLELement of the scroll target
     * @return {HTMLElement}
     */
    get scrollTarget() {
      if (this._scrollTarget) {
        return this._scrollTarget;
      }

      return this._defaultScrollTarget;
    },

    /**
     * Set the HTMLElement of the scroll target
     * @param  {HTMLElement} value
     */
    set scrollTarget(value) {
      this._scrollTarget = value;
    },

    /**
     * Get the scroll target selector
     * @return {String|HTMLElement}
     */
    get scrollTargetSelector() {
      if (this._scrollTargetSelector) {
        return this._scrollTargetSelector;
      }

      if (this.element.hasAttribute('data-scroll-target')) {
        return this.element.getAttribute('data-scroll-target');
      }
    },

    /**
     * Set the scroll target selector
     * @param  {String|HTMLElement} value
     */
    set scrollTargetSelector(value) {
      this._scrollTargetSelector = value;
    },

    /**
     * Get the default scroll target
     * @return {HTMLElement}
     */
    get _defaultScrollTarget() {
      return this._doc;
    },

    /**
     * Get the ownerDocument
     * @return {HTMLElement}
     */
    get _owner() {
      return this.element.ownerDocument;
    },

    /**
     * Get the document element
     * @return {HTMLElement}
     */
    get _doc() {
      return this._owner.documentElement;
    },

    /**
     * Gets the number of pixels that the content of an element is scrolled upward.
     * @return {number}
     */
    get _scrollTop() {
      if (this._isValidScrollTarget()) {
        return this.scrollTarget === this._doc ? window.pageYOffset : this.scrollTarget.scrollTop;
      }

      return 0;
    },

    /**
     * Sets the number of pixels that the content of an element is scrolled upward.
     * @param  {number} top
     */
    set _scrollTop(top) {
      if (this.scrollTarget === this._doc) {
        window.scrollTo(window.pageXOffset, top);
      } else if (this._isValidScrollTarget()) {
        this.scrollTarget.scrollTop = top;
      }
    },

    /**
     * Gets the number of pixels that the content of an element is scrolled to the left.
     * @return {number}
     */
    get _scrollLeft() {
      if (this._isValidScrollTarget()) {
        return this.scrollTarget === this._doc ? window.pageXOffset : this.scrollTarget.scrollLeft;
      }

      return 0;
    },

    /**
     * Sets the number of pixels that the content of an element is scrolled to the left.
     * @param  {number} left
     */
    set _scrollLeft(left) {
      if (this.scrollTarget === this._doc) {
        window.scrollTo(left, window.pageYOffset);
      } else if (this._isValidScrollTarget()) {
        this.scrollTarget.scrollLeft = left;
      }
    },

    /**
     * Gets the width of the scroll target.
     * @return {number}
     */
    get _scrollTargetWidth() {
      if (this._isValidScrollTarget()) {
        return this.scrollTarget === this._doc ? window.innerWidth : this.scrollTarget.offsetWidth;
      }

      return 0;
    },

    /**
     * Gets the height of the scroll target.
     * @return {number}
     */
    get _scrollTargetHeight() {
      if (this._isValidScrollTarget()) {
        return this.scrollTarget === this._doc ? window.innerHeight : this.scrollTarget.offsetHeight;
      }

      return 0;
    },

    get _isPositionedFixed() {
      if (this.element instanceof HTMLElement) {
        return window.getComputedStyle(this.element).position === 'fixed';
      }

      return false;
    },

    /**
     * Attach the scroll event listener to the scroll target
     * @param  {string|HTMLElement} scrollTarget The scroll target (optional)
     */
    attachToScrollTarget: function attachToScrollTarget() {
      this.detachFromScrollTarget();
      watch(this, 'scrollTargetSelector', this.attachToScrollTarget);

      if (this.scrollTargetSelector === 'document') {
        this.scrollTarget = this._doc;
      } else if (typeof this.scrollTargetSelector === 'string') {
        this.scrollTarget = document.querySelector("".concat(this.scrollTargetSelector));
      } else if (this.scrollTargetSelector instanceof HTMLElement) {
        this.scrollTarget = this.scrollTargetSelector;
      }

      if (!this._doc.style.overflow) {
        this._doc.style.overflow = this.scrollTarget !== this._doc ? 'hidden' : '';
      }

      if (this.scrollTarget) {
        this.eventTarget = this.scrollTarget === this._doc ? window : this.scrollTarget;
        this._boundScrollHandler = this._boundScrollHandler || this._scrollHandler.bind(this);

        this._loop(); // this.eventTarget.addEventListener('scroll', this._boundScrollHandler)

      }
    },
    _loop: function _loop() {
      requestAnimationFrame(this._boundScrollHandler);
    },

    /**
     * Detach the scroll event listener from the scroll target
     * @return {[type]} [description]
     */
    detachFromScrollTarget: function detachFromScrollTarget() {
      unwatch(this, 'scrollTargetSelector', this.attachToScrollTarget); // if (this.eventTarget) {
      //   this.eventTarget.removeEventListener('scroll', this._boundScrollHandler)
      // }
    },

    /**
     * Scrolls the content to a particular place.
     * @param  {number} left The left position
     * @param  {number} top  The top position
     */
    scroll: function scroll() {
      var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.scrollTarget === this._doc) {
        window.scrollTo(left, top);
      } else if (this._isValidScrollTarget()) {
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
    scrollWithBehavior: function scrollWithBehavior() {
      var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var behavior = arguments.length > 2 ? arguments[2] : undefined;
      var scrollFn = arguments.length > 3 ? arguments[3] : undefined;
      // Scroll timing function used with `behavior`
      scrollFn = typeof scrollFn === 'function' ? scrollFn : function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      }; // Smooth

      if (behavior === 'smooth') {
        var startTime = Date.now();
        var currentScrollTop = this._scrollTop;
        var currentScrollLeft = this._scrollLeft;
        var dScrollTop = top - currentScrollTop;
        var dScrollLeft = left - currentScrollLeft;
        var duration = 300;
        (function updateFrame() {
          var now = Date.now();
          var elapsedTime = now - startTime;

          if (elapsedTime < duration) {
            this.scroll(scrollFn(elapsedTime, currentScrollLeft, dScrollLeft, duration), scrollFn(elapsedTime, currentScrollTop, dScrollTop, duration));
            requestAnimationFrame(updateFrame.bind(this));
          }
        }).call(this);
      } // Default
      else {
          this.scroll(left, top);
        }
    },

    /**
     * Returns true if the scroll target is a valid HTMLElement.
     * @return {Boolean}
     */
    _isValidScrollTarget: function _isValidScrollTarget() {
      return this.scrollTarget instanceof HTMLElement;
    },

    /**
     * Scroll event handler (runs on every scroll event)
     */
    _scrollHandler: function _scrollHandler() {}
  };
};

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

var scrollEffectBehavior = function scrollEffectBehavior() {
  return {
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
    get effects() {
      if (!this.element.dataset.effects) {
        return [];
      }

      return this.element.dataset.effects.split(' ');
    },

    /**
     * Get the effects config object
     * @return {Object}
     */
    get effectsConfig() {
      if (this._effectsConfig) {
        return this._effectsConfig;
      }

      if (this.element.hasAttribute('data-effects-config')) {
        try {
          return JSON.parse(this.element.getAttribute('data-effects-config'));
        } catch (e) {}
      }

      return {};
    },

    /**
     * Set the effects config object
     * @param  {Object} value
     */
    set effectsConfig(value) {
      this._effectsConfig = value;
    },

    /**
     * The clamped value of `_scrollTop`.
     * @return {number}
     */
    get _clampedScrollTop() {
      return Math.max(0, this._scrollTop);
    },

    /**
     * Registers a scroll effect
     * @param  {string} effectName The effect name
     * @param  {Object} effectDef  The effect definition
     */
    registerEffect: function registerEffect(effectName, effectDef) {
      if (this._scrollEffects[effectName] !== undefined) {
        throw new Error("effect ".concat(effectName, " is already registered."));
      }

      this._scrollEffects[effectName] = effectDef;
    },

    /**
     * Returns true if the element is visible in the current viewport.
     * This method should be overridden by the consumer of this behavior.
     * @return {Boolean}
     */
    isOnScreen: function isOnScreen() {
      return false;
    },

    /**
     * Returns true if there's content below the element.
     * This method should be overridden by the consumer of this behavior.
     * @return {Boolean}
     */
    isContentBelow: function isContentBelow() {
      return false;
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
    createEffect: function createEffect(effectName) {
      var effectConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var effectDef = this._scrollEffects[effectName];

      if (_typeof(effectDef) === undefined) {
        throw new ReferenceError("Scroll effect ".concat(effectName, " was not registered"));
      }

      var prop = this._boundEffect(effectDef, effectConfig);

      prop.setUp();
      return prop;
    },

    /**
     * Returns an effect object bound to the current context.
     * @param  {Object} effectDef     The effect definition
     * @param  {Object} effectConfig  The effect config (optional)
     * @return {Object}
     */
    _boundEffect: function _boundEffect(effectDef) {
      var effectConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var startsAt = parseFloat(effectConfig.startsAt || 0);
      var endsAt = parseFloat(effectConfig.endsAt || 1);
      var deltaS = endsAt - startsAt;
      var noop = Function();
      var runFn = startsAt === 0 && endsAt === 1 ? effectDef.run : function (progress, top) {
        effectDef.run.call(this, Math.max(0, (progress - startsAt) / deltaS), top);
      };
      return {
        setUp: effectDef.setUp ? effectDef.setUp.bind(this, effectConfig) : noop,
        run: effectDef.run ? runFn.bind(this) : noop,
        tearDown: effectDef.tearDown ? effectDef.tearDown.bind(this) : noop
      };
    },

    /**
     * Sets up the effects.
     */
    _setUpEffects: function _setUpEffects() {
      var _this = this;

      this._tearDownEffects();

      this.effects.forEach(function (effectName) {
        var effectDef;

        if (effectDef = _this._scrollEffects[effectName]) {
          _this._effects.push(_this._boundEffect(effectDef, _this.effectsConfig[effectName]));
        }
      });

      this._effects.forEach(function (effectDef) {
        if (effectDef.setUp() !== false) {
          _this._effectsRunFn.push(effectDef.run);
        }
      });
    },

    /**
     * Tears down the effects.
     */
    _tearDownEffects: function _tearDownEffects() {
      this._effects.forEach(function (effectDef) {
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
    _runEffects: function _runEffects(progress, top) {
      this._effectsRunFn.forEach(function (run) {
        return run(progress, top);
      });
    },

    /**
     * Overrides `scrollTargetBehavior._scrollHandler`
     */
    _scrollHandler: function _scrollHandler() {
      this._updateScrollState(this._clampedScrollTop);

      this._loop();
    },

    /**
     * Updates the scroll state. 
     * Should be overriden from the consumer of the behavior.
     * @param  {number} scrollTop
     */
    _updateScrollState: function _updateScrollState(scrollTop) {},

    /**
     * Transform style
     * @param  {String} value       The transform value
     * @param  {HTMLElement} element  The element to apply transforms to (optional)
     */
    _transform: function _transform(value, element) {
      element = element || this.element;
      util.transform(value, element);
    }
  };
};

var FRONT_LAYER = '[class*="__bg-front"]';
var REAR_LAYER = '[class*="__bg-rear"]';
/**
 * blend-background effect
 */

var SCROLL_EFFECT_BLEND_BACKGROUND = {
  name: 'blend-background',
  setUp: function setUp() {
    var _this = this;

    var frontLayer = this.element.querySelector(FRONT_LAYER);
    var rearLayer = this.element.querySelector(REAR_LAYER);
    var layers = [frontLayer, rearLayer];
    layers.map(function (layer) {
      if (layer) {
        if (layer.style.transform === '') {
          _this._transform('translateZ(0)', layer);

          layer.style.willChange = 'opacity';
        }
      }
    });
    rearLayer.style.opacity = 0;
  },
  run: function run(progress, top) {
    var frontLayer = this.element.querySelector(FRONT_LAYER);
    var rearLayer = this.element.querySelector(REAR_LAYER);
    frontLayer.style.opacity = (1 - progress).toFixed(5);
    rearLayer.style.opacity = progress.toFixed(5);
  }
};

var FRONT_LAYER$1 = '[class*="__bg-front"]';
var REAR_LAYER$1 = '[class*="__bg-rear"]';
/**
 * fade-background effect
 */

var SCROLL_EFFECT_FADE_BACKGROUND = {
  name: 'fade-background',
  setUp: function setUp(config) {
    var _this = this;

    var duration = config.duration || '0.5s';
    var threshold = config.threshold || (this._isPositionedFixed ? 1 : 0.3);
    var frontLayer = this.element.querySelector(FRONT_LAYER$1);
    var rearLayer = this.element.querySelector(REAR_LAYER$1);
    var layers = [frontLayer, rearLayer];
    layers.map(function (layer) {
      if (layer) {
        var willChange = layer.style.willChange.split(',').map(function (c) {
          return c.trim();
        }).filter(function (c) {
          return c.length;
        });
        willChange.push('opacity', 'transform');
        layer.style.willChange = _toConsumableArray(new Set(willChange)).join(', ');

        if (layer.style.transform === '') {
          _this._transform('translateZ(0)', layer);
        }

        layer.style.transitionProperty = 'opacity';
        layer.style.transitionDuration = duration;
      }
    });
    this._fadeBackgroundThreshold = !this._isPositionedFixed ? threshold + this._progress * threshold : threshold;
  },
  tearDown: function tearDown() {
    delete this._fadeBackgroundThreshold;
  },
  run: function run(progress, top) {
    var frontLayer = this.element.querySelector(FRONT_LAYER$1);
    var rearLayer = this.element.querySelector(REAR_LAYER$1);

    if (progress >= this._fadeBackgroundThreshold) {
      frontLayer.style.opacity = 0;
      rearLayer.style.opacity = 1;
    } else {
      frontLayer.style.opacity = 1;
      rearLayer.style.opacity = 0;
    }
  }
};

var FRONT_LAYER$2 = '[class*="__bg-front"]';
var REAR_LAYER$2 = '[class*="__bg-rear"]';
var BG = '[class$="__bg"]';
/**
 * parallax-background effect
 */

var SCROLL_EFFECT_PARALLAX_BACKGROUND = {
  name: 'parallax-background',
  setUp: function setUp() {},
  tearDown: function tearDown() {
    var _this = this;

    var layers = [this.element.querySelector(FRONT_LAYER$2), this.element.querySelector(REAR_LAYER$2)];
    var props = ['marginTop', 'marginBottom'];
    layers.map(function (layer) {
      if (layer) {
        _this._transform('translate3d(0, 0, 0)', layer);

        props.forEach(function (prop) {
          return layer.style[prop] = '';
        });
      }
    });
  },
  run: function run(progress, top) {
    var _this2 = this;

    var unscrolledPercent = (this.scrollTarget.scrollHeight - this._scrollTargetHeight) / this.scrollTarget.scrollHeight;
    var distance = this.element.offsetHeight * unscrolledPercent;

    if (this._dHeight !== undefined) {
      unscrolledPercent = this._dHeight / this.element.offsetHeight;
      distance = this._dHeight * unscrolledPercent;
    }

    var scalar = 0.5;
    var delta = Math.abs(distance * scalar).toFixed(5);
    var max = this._isPositionedFixedEmulated ? 1000000 : distance;
    var deltaProgress = delta * progress;
    var transform = Math.min(deltaProgress, max).toFixed(5);
    var layers = [this.element.querySelector(FRONT_LAYER$2), this.element.querySelector(REAR_LAYER$2)];
    layers.map(function (layer) {
      if (layer) {
        layer.style['marginTop'] = "".concat(-1 * delta, "px");

        _this2._transform("translate3d(0, ".concat(transform, "px, 0)"), layer);
      }
    });
    var bgNode = this.element.querySelector(BG);

    if (!bgNode.style.visibility) {
      bgNode.style.visibility = 'visible';
    }
  }
};

// import effects

var SCROLL_EFFECTS = [SCROLL_EFFECT_BLEND_BACKGROUND, SCROLL_EFFECT_FADE_BACKGROUND, SCROLL_EFFECT_PARALLAX_BACKGROUND];

/**
 * waterfall effect
 */
var HEADER_SCROLL_EFFECT_WATERFALL = {
  name: 'waterfall',
  setUp: function setUp() {
    this._primary.classList.add('mdk-header--shadow');
  },
  run: function run(progress, top) {
    this._primary.classList[this.isOnScreen() && this.isContentBelow() ? 'add' : 'remove']('mdk-header--shadow-show');
  },
  tearDown: function tearDown() {
    this._primary.classList.remove('mdk-header--shadow');
  }
};

var interpolate = function interpolate(progress, points, fn, ctx) {
  fn.apply(ctx, points.map(function (point) {
    return point[0] + (point[1] - point[0]) * progress;
  }));
};
/**
 * fx-condenses effect
 * 
 * Transform properties of one or more designated header elements 
 * between two values based on the scroll position.
 */


var HEADER_SCROLL_EFFECT_FX_CONDENSES = {
  name: 'fx-condenses',
  setUp: function setUp() {
    var _this = this;

    var elements = _toConsumableArray(this.element.querySelectorAll('[data-fx-condenses]'));

    var targets = _toConsumableArray(this.element.querySelectorAll('[data-fx-id]'));

    var bounds = {};
    elements.forEach(function (element) {
      if (element) {
        element.style.willChange = 'transform';

        _this._transform('translateZ(0)', element);

        if (window.getComputedStyle(element).display === 'inline') {
          element.style.display = 'inline-block';
        }

        var id = element.getAttribute('id');

        if (!element.hasAttribute('id')) {
          id = 'rt' + (0 | Math.random() * 9e6).toString(36);
          element.setAttribute('id', id);
        }

        var bound = element.getBoundingClientRect();
        bounds[id] = bound;
      }
    });
    targets.forEach(function (target) {
      if (target) {
        var id = target.getAttribute('id');
        var fxId = target.getAttribute('data-fx-id');

        var fxEl = _this.element.querySelector("#".concat(fxId));

        var targetBounds = bounds[id];
        var fxBounds = bounds[fxId];
        var hasTextContent = target.textContent.trim().length > 0;
        var scale = 1;

        if (fxBounds !== undefined) {
          bounds[id].dx = targetBounds.left - fxBounds.left;
          bounds[id].dy = targetBounds.top - fxBounds.top;

          if (hasTextContent) {
            scale = parseInt(window.getComputedStyle(fxEl)['font-size'], 10) / parseInt(window.getComputedStyle(target)['font-size'], 10);
          } else {
            scale = fxBounds.height / targetBounds.height;
          }

          bounds[id].scale = scale;
        }
      }
    });
    this._fxCondenses = {
      elements: elements,
      targets: targets,
      bounds: bounds
    };
  },
  run: function run(progress, top) {
    var _this2 = this;

    var fx = this._fxCondenses;

    if (!this.condenses) {
      top = 0;
    }

    if (progress >= 1) {
      fx.elements.forEach(function (el) {
        if (el) {
          el.style.willChange = 'opacity';
          el.style.opacity = fx.targets.indexOf(el) !== -1 ? 0 : 1;
        }
      });
    } else {
      fx.elements.forEach(function (el) {
        if (el) {
          el.style.willChange = 'opacity';
          el.style.opacity = fx.targets.indexOf(el) !== -1 ? 1 : 0;
        }
      });
    }

    fx.targets.forEach(function (target) {
      if (target) {
        var id = target.getAttribute('id');
        interpolate(Math.min(1, progress), [[1, fx.bounds[id].scale], [0, -fx.bounds[id].dx], [top, top - fx.bounds[id].dy]], function (scale, translateX, translateY) {
          target.style.willChange = 'transform';
          translateX = translateX.toFixed(5);
          translateY = translateY.toFixed(5);
          scale = scale.toFixed(5);

          _this2._transform("translate(".concat(translateX, "px, ").concat(translateY, "px) scale3d(").concat(scale, ", ").concat(scale, ", 1)"), target);
        });
      }
    });
  },
  tearDown: function tearDown() {
    delete this._fxCondenses;
  }
};

// import effects

var HEADER_SCROLL_EFFECTS = [HEADER_SCROLL_EFFECT_WATERFALL, HEADER_SCROLL_EFFECT_FX_CONDENSES];

var MODULE = 'mdk-header';
var CONTENT = ".".concat(MODULE, "__content");
var BG$1 = ".".concat(MODULE, "__bg");
var FRONT_LAYER$3 = "".concat(BG$1, "-front");
var REAR_LAYER$3 = "".concat(BG$1, "-rear");
var MODIFIER_FIXED = "".concat(MODULE, "--fixed");
/**
 * A container element for navigation and other content at the top 
 * of the screen with visual effects based on scroll position
 * 
 * @param  {HTMLElement} element
 * @return {Object}
 */

var headerComponent = function headerComponent(element) {
  var _primary, _ref, _mutatorMap;

  return _ref = {
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
    observers: ['_handleFixedPositionedScroll(scrollTarget)', '_reset(condenses, reveals, fixed)'],

    /**
     * Event listeners
     * @type {Array}
     */
    listeners: ['window._debounceResize(resize)'],

    /**
     * Compose mixins
     * @type {Array}
     */
    mixins: [scrollTargetBehavior(), scrollEffectBehavior()],
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
    get transformDisabled() {
      return this.disabled || this.element.dataset.transformDisabled || !this._isPositionedFixedEmulated || !this.willCondense();
    },

    /**
     * Update `transform-disabled` attribute on `element`
     * @param  {Boolean}  value
     */
    set transformDisabled(value) {
      this.element[value ? 'setAttribute' : 'removeAttribute']('data-transform-disabled', 'data-transform-disabled');
    },

    /**
     * The distance the header is allowed to move away.
     * @return {number}
     */
    get _maxHeaderTop() {
      return this.fixed ? this._dHeight : this._height + 5;
    },

    get _isPositionedFixedEmulated() {
      return this.fixed || this.condenses || this.reveals;
    },

    get _isPositionedAbsolute() {
      return window.getComputedStyle(this.element).position === 'absolute';
    },

    get _primaryisPositionedFixed() {
      return window.getComputedStyle(this._primary).position === 'fixed';
    },

    /**
     * Returns true if the header will condense based on the size of the header
     * @return {Boolean}
     */
    willCondense: function willCondense() {
      return this._dHeight > 0 && this.condenses;
    },

    /**
     * Returns true if the element is visible in the current viewport.
     * @return {Boolean}
     */
    isOnScreen: function isOnScreen() {
      return this._height !== 0 && this._top < this._height;
    },

    /**
     * Returns true if there's content below the element.
     * @return {Boolean}
     */
    isContentBelow: function isContentBelow() {
      if (this._top === 0) {
        return this._clampedScrollTop > 0;
      }

      return this._clampedScrollTop - this._maxHeaderTop >= 0;
    },

    /**
     * Returns an object containing the progress value of the scroll
     * and the top position of the header.
     * @return {Object}
     */
    getScrollState: function getScrollState() {
      return {
        progress: this._progress,
        top: this._top
      };
    },
    _setupBackgrounds: function _setupBackgrounds() {
      var bgNode = this.element.querySelector(BG$1);

      if (!bgNode) {
        bgNode = document.createElement('DIV');
        this.element.insertBefore(bgNode, this.element.childNodes[0]);
        bgNode.classList.add(BG$1.substr(1));
      }

      [FRONT_LAYER$3, REAR_LAYER$3].map(function (className) {
        var bgNodeLayer = bgNode.querySelector(className);

        if (!bgNodeLayer) {
          bgNodeLayer = document.createElement('DIV');
          bgNode.appendChild(bgNodeLayer);
          bgNodeLayer.classList.add(className.substr(1));
        }
      });
    },
    _reset: function _reset() {
      if (this.element.offsetWidth === 0 && this.element.offsetHeight === 0) {
        return;
      }

      if (this._primaryisPositionedFixed) {
        this.element.style.paddingTop = this._primary.offsetHeight + 'px';
      }

      var scrollTop = this._clampedScrollTop;
      var firstSetup = this._height === 0 || scrollTop === 0;
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
    _handleFixedPositionedScroll: function _handleFixedPositionedScroll() {
      if (this._fixedPositionedScrollHandler !== undefined) {
        this._fixedPositionedScrollHandler.restore();
      }

      if (this._isValidScrollTarget() && this._isPositionedFixedEmulated && this.scrollTarget !== this._doc && this.retargetMouseScroll) {
        this._fixedPositionedScrollHandler = RetargetMouseScroll(this.element, this.scrollTarget);
      }
    }
  }, _primary = "_primary", _mutatorMap = {}, _mutatorMap[_primary] = _mutatorMap[_primary] || {}, _mutatorMap[_primary].get = function () {
    if (this._primaryElement) {
      return this._primaryElement;
    }

    var primary;
    var nodes = this.element.querySelector(CONTENT).children;

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        var node = nodes[i];

        if (node.dataset.primary !== undefined) {
          primary = node;
          break;
        } else if (!primary) {
          primary = node;
        }
      }
    }

    this._primaryElement = primary;
    return this._primaryElement;
  }, _defineProperty(_ref, "_updateScrollState", function _updateScrollState(scrollTop, forceUpdate) {
    if (this._height === 0 || this.disabled) {
      return;
    }

    if (!forceUpdate && scrollTop === this._lastScrollTop) {
      return;
    }

    var progress = 0;
    var top = 0;
    var lastTop = this._top;
    var maxHeaderTop = this._maxHeaderTop;
    var dScrollTop = scrollTop - this._lastScrollTop;
    var absDScrollTop = Math.abs(dScrollTop);
    var isScrollingDown = scrollTop > this._lastScrollTop;
    var now = Date.now();

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
          } else if (!isScrollingDown && scrollTop >= this._dHeight) {
            top = this.condenses ? this._dHeight : 0;
          }

          var scrollVelocity = dScrollTop / (now - this._lastTimestamp);
          this._revealTransitionDuration = this._clamp((top - lastTop) / scrollVelocity, 0, 300);
        } else {
          top = this._top;
        }
      }
    }

    if (this._dHeight === 0) {
      progress = scrollTop > 0 ? 1 : 0;
    } else {
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
  }), _defineProperty(_ref, "_transformHeader", function _transformHeader(top) {
    if (this.transformDisabled) {
      return;
    }

    if (this._isPositionedAbsolute) {
      var _transform = top;

      if (this.scrollTarget === this._doc) {
        _transform = 0;
      }

      if (top === _transform) {
        this.element.style.willChange = 'transform';

        this._transform("translate3d(0, ".concat(_transform * -1, "px, 0)"));
      }

      if (top >= this._primaryTop) {
        this._primary.style.willChange = 'transform';

        this._transform("translate3d(0, ".concat(Math.min(top, this._dHeight) - this._primaryTop, "px, 0)"), this._primary);
      }

      return;
    }

    if (this.fixed && this._isPositionedFixed) {
      var _transform2 = top;
      this.element.style.willChange = 'transform';

      this._transform("translate3d(0, ".concat(_transform2 * -1, "px, 0)"));

      if (top >= this._primaryTop) {
        this._primary.style.willChange = 'transform';

        this._transform("translate3d(0, ".concat(Math.min(top, this._dHeight) - this._primaryTop, "px, 0)"), this._primary);
      }

      return;
    }

    var transform = 0;
    var duration = "".concat(this._revealTransitionDuration, "ms");

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

    this._transform("translate3d(0, ".concat(transform, "px, 0)"), this._primary);
  }), _defineProperty(_ref, "_clamp", function _clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }), _defineProperty(_ref, "_mayMove", function _mayMove() {
    return this.condenses || !this.fixed;
  }), _defineProperty(_ref, "_debounceResize", function _debounceResize() {
    var _this = this;

    clearTimeout(this._onResizeTimeout);

    if (this._resizeWidth !== window.innerWidth) {
      this._onResizeTimeout = setTimeout(function () {
        _this._resizeWidth = window.innerWidth;

        _this._reset();
      }, 50);
    }
  }), _defineProperty(_ref, "init", function init() {
    var _this2 = this;

    this._resizeWidth = window.innerWidth;
    this.attachToScrollTarget();

    this._handleFixedPositionedScroll();

    this._setupBackgrounds();

    this._primary.setAttribute('data-primary', 'data-primary');

    this._primary.classList[this.fixed || this.condenses ? 'add' : 'remove'](MODIFIER_FIXED);

    SCROLL_EFFECTS.concat(HEADER_SCROLL_EFFECTS).map(function (effect) {
      return _this2.registerEffect(effect.name, effect);
    });
  }), _defineProperty(_ref, "destroy", function destroy() {
    clearTimeout(this._onResizeTimeout);
    this.detachFromScrollTarget();
  }), _defineEnumerableProperties(_ref, _mutatorMap), _ref;
};
handler.register(MODULE, headerComponent);

/**
 * A wrapper element that positions a Header and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */

var headerLayoutComponent = function headerLayoutComponent() {
  return {
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
    observers: ['_updateScroller(hasScrollingRegion)', '_updateContentPosition(hasScrollingRegion, header.fixed, header.condenses)', '_updateDocument(fullbleed)'],

    /**
     * Event listeners.
     * @type {Array}
     */
    listeners: ['window._debounceResize(resize)'],

    /**
     * The header layout content wrapper HTMLElement
     * @return {HTMLElement}
     */
    get contentContainer() {
      return this.element.querySelector('.mdk-header-layout__content');
    },

    /**
     * A reference to the header component
     * @return {Object}
     */
    get header() {
      var headerNode = this.element.querySelector('.mdk-header');

      if (headerNode) {
        return headerNode.mdkHeader;
      }
    },

    _updateScroller: function _updateScroller() {
      this.header.scrollTargetSelector = this.hasScrollingRegion ? this.contentContainer : null;
    },
    _updateContentPosition: function _updateContentPosition() {
      var headerHeight = this.header.element.offsetHeight;
      var gutter = parseInt(window.getComputedStyle(this.header.element).marginBottom, 10);
      var containerStyle = this.contentContainer.style;

      if (this.header.fixed || this.header.willCondense()) {
        containerStyle.paddingTop = "".concat(headerHeight + gutter, "px");
        containerStyle.marginTop = '';
      }
    },

    /**
     * Handle the resize event every 50ms
     */
    _debounceResize: function _debounceResize() {
      var _this = this;

      clearTimeout(this._onResizeTimeout);

      if (this._resizeWidth !== window.innerWidth) {
        this._onResizeTimeout = setTimeout(function () {
          _this._resizeWidth = window.innerWidth;

          _this._reset();
        }, 50);
      }
    },
    _updateDocument: function _updateDocument() {
      var docElements = _toConsumableArray(document.querySelectorAll('html, body'));

      if (this.fullbleed) {
        docElements.forEach(function (el) {
          el.style.height = '100%';
        });
      }
    },
    _reset: function _reset() {
      this._updateContentPosition();
    },

    /**
     * Initialize component
     */
    init: function init() {
      this._resizeWidth = window.innerWidth;

      this._updateDocument();

      this._updateScroller();
    },

    /**
     * Destroy component
     */
    destroy: function destroy() {
      clearTimeout(this._onResizeTimeout);

      var docElements = _toConsumableArray(document.querySelectorAll('html, body'));

      docElements.forEach(function (el) {
        // fullbleed
        el.style.height = '';
      });
    }
  };
};
handler.register('mdk-header-layout', headerLayoutComponent);

var MODULE$1 = 'mdk-box';
var BG$2 = ".".concat(MODULE$1, "__bg");
var FRONT_LAYER$4 = "".concat(BG$2, "-front");
var REAR_LAYER$4 = "".concat(BG$2, "-rear");
/**
 * A container element for generic content with visual effects based on scroll position
 * @param  {HTMLElement} element
 * @return {Object}
 */

var boxComponent = function boxComponent(element) {
  return {
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
    listeners: ['window._debounceResize(resize)'],

    /**
     * Compose mixins
     * @type {Array}
     */
    mixins: [scrollTargetBehavior(), scrollEffectBehavior()],
    // The current scroll progress
    _progress: 0,

    /**
     * Returns true if the element is visible in the current viewport.
     * @return {Boolean}
     */
    isOnScreen: function isOnScreen() {
      return this._elementTop < this._scrollTop + this._scrollTargetHeight && this._elementTop + this.element.offsetHeight > this._scrollTop;
    },
    isVisible: function isVisible() {
      return this.element.offsetWidth > 0 && this.element.offsetHeight > 0;
    },

    /**
     * Returns an object containing the progress value of the scroll effects.
     * @return {Object}
     */
    getScrollState: function getScrollState() {
      return {
        progress: this._progress
      };
    },
    _setupBackgrounds: function _setupBackgrounds() {
      var bgNode = this.element.querySelector(BG$2);

      if (!bgNode) {
        bgNode = document.createElement('DIV');
        this.element.insertBefore(bgNode, this.element.childNodes[0]);
        bgNode.classList.add(BG$2.substr(1));
      }

      [FRONT_LAYER$4, REAR_LAYER$4].map(function (className) {
        var bgNodeLayer = bgNode.querySelector(className);

        if (!bgNodeLayer) {
          bgNodeLayer = document.createElement('DIV');
          bgNode.appendChild(bgNodeLayer);
          bgNodeLayer.classList.add(className.substr(1));
        }
      });
    },
    _getElementTop: function _getElementTop() {
      var currentNode = this.element;
      var top = 0;

      while (currentNode && currentNode !== this.scrollTarget) {
        top += currentNode.offsetTop;
        currentNode = currentNode.offsetParent;
      }

      return top;
    },

    /**
     * Updates the scroll state.
     * @param  {number} scrollTop
     */
    _updateScrollState: function _updateScrollState(scrollTop) {
      if (this.disabled) {
        return;
      }

      if (this.isOnScreen()) {
        var target = Math.min(this._scrollTargetHeight, this._elementTop + this.element.offsetHeight);
        var viewportTop = this._elementTop - scrollTop;
        var progress = 1 - (viewportTop + this.element.offsetHeight) / target;
        this._progress = progress;

        this._runEffects(this._progress, scrollTop);
      }
    },

    /**
     * Handle the resize event every 50ms
     */
    _debounceResize: function _debounceResize() {
      var _this = this;

      clearTimeout(this._onResizeTimeout);

      if (this._resizeWidth !== window.innerWidth) {
        this._onResizeTimeout = setTimeout(function () {
          _this._resizeWidth = window.innerWidth;

          _this._reset();
        }, 50);
      }
    },

    /**
     * Initialize component
     */
    init: function init() {
      var _this2 = this;

      this._resizeWidth = window.innerWidth;
      this.attachToScrollTarget();

      this._setupBackgrounds();

      SCROLL_EFFECTS.map(function (effect) {
        return _this2.registerEffect(effect.name, effect);
      });
    },
    _reset: function _reset() {
      this._elementTop = this._getElementTop();

      this._setUpEffects();

      this._updateScrollState(this._clampedScrollTop);
    },

    /**
     * Destroy component
     */
    destroy: function destroy() {
      clearTimeout(this._onResizeTimeout);
      this.detachFromScrollTarget();
    }
  };
};
handler.register(MODULE$1, boxComponent);

/**
 * A navigation drawer that can slide in from the left or right
 * @param  {HTMLElement} element
 * @return {Object}
 */

var drawerComponent = function drawerComponent() {
  return {
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
    observers: ['_resetPosition(align)', '_fireChange(opened, persistent, align, position)', '_onChangedState(_drawerState)', '_onClose(opened)'],

    /**
     * Event listeners.
     * @type {Array}
     */
    listeners: ['_onTransitionend(transitionend)', 'scrim._onClickScrim(click)'],
    // The current drawer state
    _drawerState: 0,
    // Possible drawer states
    _DRAWER_STATE: {
      INIT: 0,
      OPENED: 1,
      OPENED_PERSISTENT: 2,
      CLOSED: 3
    },

    /**
     * The drawer content HTMLElement
     * @return {HTMLElement}
     */
    get contentContainer() {
      return this.element.querySelector('.mdk-drawer__content');
    },

    /**
     * The drawer scrim HTMLElement
     * @return {HTMLElement}
     */
    get scrim() {
      var scrim = this.element.querySelector('.mdk-drawer__scrim');

      if (!scrim) {
        scrim = document.createElement('DIV');
        this.element.insertBefore(scrim, this.element.childNodes[0]);
        scrim.classList.add('mdk-drawer__scrim');
      }

      return scrim;
    },

    /**
     * Get the width of the drawer.
     * @return {String}
     */
    getWidth: function getWidth() {
      return this.contentContainer.offsetWidth;
    },

    /**
     * Toggles the drawer opened state.
     */
    toggle: function toggle() {
      this.opened = !this.opened;
    },

    /**
     * Closes the drawer.
     */
    close: function close() {
      this.opened = false;
    },

    /**
     * Opens the drawer.
     */
    open: function open() {
      this.opened = true;
    },
    _onClose: function _onClose(opened) {
      if (!opened) {
        this.element.setAttribute('data-closing', true);
      }
    },
    _isRTL: function _isRTL() {
      return window.getComputedStyle(this.element).direction === 'rtl';
    },
    _setTransitionDuration: function _setTransitionDuration(duration) {
      this.contentContainer.style.transitionDuration = duration;
      this.scrim.style.transitionDuration = duration;
    },
    _resetDrawerState: function _resetDrawerState() {
      var oldState = this._drawerState;

      if (this.opened) {
        this._drawerState = this.persistent ? this._DRAWER_STATE.OPENED_PERSISTENT : this._DRAWER_STATE.OPENED;
      } else {
        this._drawerState = this._DRAWER_STATE.CLOSED;
      }

      if (oldState !== this._drawerState) {
        if (!this.opened) {
          this.element.removeAttribute('data-closing');
        }

        if (this._drawerState === this._DRAWER_STATE.OPENED) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    },
    _resetPosition: function _resetPosition() {
      switch (this.align) {
        case 'start':
          this.position = this._isRTL() ? 'right' : 'left';
          return;

        case 'end':
          this.position = this._isRTL() ? 'left' : 'right';
          return;
      }

      this.position = this.align;
    },
    _fireChange: function _fireChange() {
      this.fire('mdk-drawer-change');
    },
    _fireChanged: function _fireChanged() {
      this.fire('mdk-drawer-changed');
    },
    _onTransitionend: function _onTransitionend(event) {
      var target = event.target;

      if (target === this.contentContainer || target === this.scrim) {
        this._resetDrawerState();
      }
    },
    _onClickScrim: function _onClickScrim(event) {
      event.preventDefault();
      this.close();
    },
    _onChangedState: function _onChangedState(newState, oldState) {
      if (oldState !== this._DRAWER_STATE.INIT) {
        this._fireChanged();
      }
    },

    /**
     * Initialize component
     */
    init: function init() {
      var _this = this;

      this._resetPosition();

      this._setTransitionDuration('0s');

      setTimeout(function () {
        _this._setTransitionDuration('');

        _this._resetDrawerState();
      }, 0);
    }
  };
};
handler.register('mdk-drawer', drawerComponent);

/**
 * Bind to a CSS media query
 * @param  {String} query The CSS media query
 * @return {Object}
 */

var mediaQuery = function mediaQuery(query) {
  var mediaQuery = {
    // The CSS media query
    query: query,
    // CSS media query matches
    queryMatches: null,
    _reset: function _reset() {
      this._removeListener();

      this.queryMatches = null;

      if (!this.query) {
        return;
      }

      this._mq = window.matchMedia(this.query);

      this._addListener();

      this._handler(this._mq);
    },
    _handler: function _handler(mq) {
      this.queryMatches = mq.matches;
    },
    _addListener: function _addListener() {
      if (this._mq) {
        this._mq.addListener(this._handler);
      }
    },
    _removeListener: function _removeListener() {
      if (this._mq) {
        this._mq.removeListener(this._handler);
      }

      this._mq = null;
    },

    /**
     * Initialize mediaQuery
     */
    init: function init() {
      watch(this, 'query', this._reset);

      this._reset();
    },

    /**
     * Destroy mediaQuery
     * @return {[type]} [description]
     */
    destroy: function destroy() {
      unwatch(this, 'query', this._reset);

      this._removeListener();
    }
  }; // Bind handlers

  mediaQuery._reset = mediaQuery._reset.bind(mediaQuery);
  mediaQuery._handler = mediaQuery._handler.bind(mediaQuery); // Initialize mediaQuery

  mediaQuery.init();
  return mediaQuery;
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/**
 * A wrapper element that positions a Drawer and other content.
 * @param  {HTMLElement} element
 * @return {Object}
 */


var drawerLayoutComponent = function drawerLayoutComponent() {
  return {
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
    observers: ['_resetLayout(narrow, forceNarrow)', '_onQueryMatches(mediaQuery.queryMatches)', '_updateScroller(hasScrollingRegion)', '_updateDocument(fullbleed)'],

    /**
     * Event listeners.
     * @type {Array}
     */
    listeners: ['drawer._onDrawerChange(mdk-drawer-change)'],
    // The default `narrow` value
    _narrow: null,
    // The mediaQuery listener
    _mediaQuery: null,

    /**
     * The mediaQuery listener
     * @return {Object}
     */
    get mediaQuery() {
      if (!this._mediaQuery) {
        this._mediaQuery = mediaQuery(this.responsiveMediaQuery);
      }

      return this._mediaQuery;
    },

    /**
     * Returns true if the narrow layout is enabled.
     * @return {Boolean}
     */
    get narrow() {
      return this.forceNarrow ? true : this._narrow;
    },

    /**
     * Toggle the narrow layout.
     * @param  {Boolean} value
     */
    set narrow(value) {
      this._narrow = !value && this.forceNarrow ? true : value;
    },

    /**
     * The HTMLElement for the layout content
     * @return {HTMLElement}
     */
    get contentContainer() {
      return this.element.querySelector('.mdk-drawer-layout__content');
    },

    get drawerNode() {
      var drawerNode;

      try {
        drawerNode = Array.from(this.element.children).find(function (e) {
          return e.matches('.mdk-drawer');
        });
      } catch (e) {
        console.error(e.message, e.stack);
      }

      if (drawerNode) {
        return drawerNode;
      }
    },

    /**
     * The drawerComponent
     * @return {Object} A reference to the drawer component.
     */
    get drawer() {
      if (this.drawerNode) {
        return this.drawerNode.mdkDrawer;
      }
    },

    /**
     * Computed media query value passed to the mediaQuery listener
     * @return {String}
     */
    get responsiveMediaQuery() {
      return this.forceNarrow ? '(min-width: 0px)' : "(max-width: ".concat(this.responsiveWidth, ")");
    },

    _updateDocument: function _updateDocument() {
      var docElements = _toConsumableArray(document.querySelectorAll('html, body'));

      if (this.fullbleed) {
        docElements.forEach(function (el) {
          el.style.height = '100%';
        });
      }
    },
    _updateScroller: function _updateScroller() {
      var docElements = _toConsumableArray(document.querySelectorAll('html, body'));

      if (this.hasScrollingRegion) {
        docElements.forEach(function (el) {
          el.style.overflow = 'hidden';
          el.style.position = 'relative';
        });
      }
    },
    _resetLayout: function _resetLayout() {
      this.drawer.opened = this.drawer.persistent = !this.narrow;

      this._onDrawerChange();
    },
    _resetPush: function _resetPush() {
      var drawer = this.drawer;
      var drawerWidth = this.drawer.getWidth();
      var contentContainer = this.contentContainer;

      var isRTL = drawer._isRTL();

      if (drawer.opened) {
        util.transform('translate3d(0, 0, 0)', contentContainer);
        return;
      }

      var transform = (this.element.offsetWidth - contentContainer.offsetWidth) / 2;
      transform = drawer.position === 'right' ? transform : transform * -1;
      util.transform("translate3d(".concat(transform, "px, 0, 0)"), contentContainer);
    },
    _setContentTransitionDuration: function _setContentTransitionDuration(duration) {
      this.contentContainer.style.transitionDuration = duration;
    },
    _onDrawerChange: function _onDrawerChange() {
      this._resetPush();
    },
    _onQueryMatches: function _onQueryMatches(value) {
      this.narrow = value;
    },

    /**
     * Initialize component
     */
    init: function init() {
      var _this = this;

      // Initial render
      this._setContentTransitionDuration('0s');

      setTimeout(function () {
        return _this._setContentTransitionDuration('');
      }, 0);

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
    destroy: function destroy() {
      this.mediaQuery.destroy();

      var docElements = _toConsumableArray(document.querySelectorAll('html, body'));

      docElements.forEach(function (el) {
        // fullbleed
        el.style.height = ''; // has-scrolling-region

        el.style.overflow = '';
        el.style.position = '';
      });
    }
  };
};
handler.register('mdk-drawer-layout', drawerLayoutComponent);

/**
 * A content area that reveals on user interaction.
 * @param  {HTMLElement} element
 * @return {Object}
 */

var revealComponent = function revealComponent() {
  return {
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
    observers: ['_onChange(opened)'],

    /**
     * Event listeners.
     * @type {Array}
     */
    listeners: ['_onEnter(mouseenter, touchstart)', '_onLeave(mouseleave, touchend)', 'window._debounceResize(resize)', '_onClick(click)'],

    /**
     * Revealable element.
     * @return {HTMLElement}
     */
    get reveal() {
      return this.element.querySelector('.mdk-reveal__content');
    },

    /**
     * Partial mask element.
     * @return {HTMLElement}
     */
    get partial() {
      var partial = this.reveal.querySelector('.mdk-reveal__partial');

      if (!partial) {
        partial = document.createElement('DIV');
        partial.classList.add('mdk-reveal__partial');
        this.reveal.insertBefore(partial, this.reveal.childNodes[0]);
      }

      return partial;
    },

    /**
     * Open the revealable element.
     */
    open: function open() {
      this.opened = true;
    },

    /**
     * Close the revealable element.
     */
    close: function close() {
      this.opened = false;
    },

    /**
     * Toggle the opened state.
     */
    toggle: function toggle() {
      this.opened = !this.opened;
    },

    /**
     * Set the initial state.
     * Gets called automatically on `window.load`
     */
    _reset: function _reset() {
      this._translate = 'translateY(' + -1 * (this.reveal.offsetHeight - this.partialHeight) + 'px)';

      if (this.partialHeight !== 0) {
        this.partial.style.height = this.partialHeight + 'px';
      }

      this.element.style.height = this.reveal.offsetTop + this.partialHeight + 'px';

      if (this.forceReveal && !this.opened) {
        this.open();
      }
    },
    _onChange: function _onChange() {
      util.transform(this.opened ? this._translate : 'translateY(0)', this.reveal);
    },

    /**
     * Handle `mouseenter` and `touchstart` events.
     * @param  {MouseEvent|TouchEvent} event
     */
    _onEnter: function _onEnter() {
      if (this.trigger === 'hover' && !this.forceReveal) {
        this.open();
      }
    },

    /**
     * Handle `click` event.
     * @param  {MouseEvent|TouchEvent} event
     */
    _onClick: function _onClick() {
      if (this.trigger === 'click') {
        this.toggle();
      }
    },

    /**
     * Handle `mouseleave` and `touchend` events.
     * @param  {MouseEvent|TouchEvent} event
     */
    _onLeave: function _onLeave() {
      if (this.trigger === 'hover' && !this.forceReveal) {
        this.close();
      }
    },

    /**
     * Debounce `window.resize` handler.
     */
    _debounceResize: function _debounceResize() {
      var _this = this;

      clearTimeout(this._debounceResizeTimer);
      this._debounceResizeTimer = setTimeout(function () {
        if (_this._resizeWidth !== window.innerWidth) {
          _this._resizeWidth = window.innerWidth;

          _this._reset();
        }
      }, 50);
    },

    /**
     * Initialize component.
     */
    init: function init() {
      this._resizeWidth = window.innerWidth;
    },

    /**
     * Destroy component.
     */
    destroy: function destroy() {
      clearTimeout(this._debounceResizeTimer);
    }
  };
};
handler.register('mdk-reveal', revealComponent);

var isTouch = function isTouch() {
  return 'ontouchstart' in window;
};

var matrixValues = function matrixValues(matrix) {
  if (matrix === 'none') {
    matrix = 'matrix(0,0,0,0,0)';
  }

  var obj = {};
  var values = matrix.match(/([-+]?[\d\.]+)/g);
  obj.translate = {
    x: parseInt(values[4], 10) || 0,
    y: parseInt(values[5], 10) || 0
  };
  return obj;
};

var transformMatrix = function transformMatrix(el) {
  var st = window.getComputedStyle(el, null);
  var matrix = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform');
  return matrixValues(matrix);
};
/**
 * Compute the pointer coordinates from multiple event types.
 * @param  {TouchEvent|MouseEvent} event
 */


var pointer = function pointer(event) {
  event = event.originalEvent || event || window.event;
  event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;
  return {
    x: event.pageX ? event.pageX : event.clientX,
    y: event.pageY ? event.pageY : event.clientY
  };
};
/**
 * Compute the difference between the properties of two objects.
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */


var difference = function difference(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
};
/**
 * A Carousel component for cycling through elements.
 * @param  {HTMLELement} element
 * @return {Object}
 */


var carouselComponent = function carouselComponent() {
  return {
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
    listeners: ['_onEnter(mouseenter)', '_onLeave(mouseleave)', '_onTransitionend(transitionend)', '_onDragStart(mousedown, touchstart)', '_onMouseDrag(dragstart, selectstart)', 'document._onDragMove(mousemove, touchmove)', 'document._onDragEnd(mouseup, touchend)', 'window._debounceResize(resize)'],
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
    _reset: function _reset() {
      this._content = this.element.querySelector('.mdk-carousel__content');
      this._items = _toConsumableArray(this._content.children);
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
      this._content.style.width = itemWidth * this._items.length + 'px';

      this._items.forEach(function (item) {
        item.classList.add('mdk-carousel__item');
        item.style.width = itemWidth + 'px';
      });

      if (!this._current) {
        this._current = this._items[0];
      }

      if (this._items.length < 2) {
        return;
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
    start: function start() {
      this.stop();

      if (this._items.length < 2 || this._items.length <= this._visible) {
        return;
      }

      this._setContentTransitionDuration('');

      this._interval = setInterval(this.next.bind(this), this.interval);
    },

    /**
     * Stop sliding the carousel on a time interval.
     */
    stop: function stop() {
      clearInterval(this._interval);
      this._interval = null;
    },

    /**
     * Move the carousel forward by one item.
     */
    next: function next() {
      if (this._items.length < 2 || this._isMoving || document.hidden || !this._isOnScreen()) {
        return;
      }

      var currentIndex = this._items.indexOf(this._current);

      var nextIndex = this._items[currentIndex + 1] !== undefined ? currentIndex + 1 : 0;
      var remaining = this._items.length - currentIndex;

      if (remaining === this._visible) {
        nextIndex = 0;
      }

      this._to(nextIndex);
    },

    /**
     * Move the carousel backward by one item.
     */
    prev: function prev() {
      if (this._items.length < 2 || this._isMoving) {
        return;
      }

      var currentIndex = this._items.indexOf(this._current);

      var prevIndex = this._items[currentIndex - 1] !== undefined ? currentIndex - 1 : this._items.length;

      this._to(prevIndex);
    },
    _transform: function _transform(translate, duration, callback) {
      if (duration !== undefined) {
        this._setContentTransitionDuration(duration + 'ms');
      }

      var matrix = transformMatrix(this._content);

      if (matrix.translate.x === translate) {
        if (typeof callback === 'function') {
          callback.call(this);
        }
      } else {
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
    _to: function _to(index) {
      if (this._items.length < 2 || this._isMoving) {
        return;
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
    _debounceResize: function _debounceResize() {
      clearTimeout(this._resizeTimer);

      if (this._resizeWidth !== window.innerWidth) {
        this._resizeTimer = setTimeout(function () {
          this._resizeWidth = window.innerWidth;
          this.stop();

          this._reset();
        }.bind(this), 50);
      }
    },
    _setContentTransitionDuration: function _setContentTransitionDuration(duration) {
      this._content.style.transitionDuration = duration;
    },

    /**
     * Stop the carousel auto sliding on `mouseenter`.
     */
    _onEnter: function _onEnter() {
      this.stop();
    },

    /**
     * (Re)start the carousel auto sliding on `mouseleave`.
     */
    _onLeave: function _onLeave() {
      if (!this._drag.wasDragging && this.autoStart) {
        this.start();
      }
    },

    /**
     * Handle `transitionend` events
     * @param  {TransitionEvent} event
     */
    _onTransitionend: function _onTransitionend() {
      this._isMoving = false;
    },

    /**
     * Handle `mousedown` and `touchstart` events
     * @param  {MouseEvent|TouchEvent} event
     */
    _onDragStart: function _onDragStart(event) {
      if (this._drag.isDragging || this._isMoving || event.which === 3) {
        return;
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
    _onDragMove: function _onDragMove(event) {
      if (!this._drag.isDragging) {
        return;
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
    _onDragEnd: function _onDragEnd(event) {
      if (!this._drag.isDragging) {
        return;
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
      } else {
        this._transform(this._drag.start.x);
      }

      this._drag.isDragging = false;
      this._drag.wasDragging = true;
    },

    /**
     * Prevent and stop the default actions on text selection and dragging elements
     * @param  {Event|DragEvent} event
     */
    _onMouseDrag: function _onMouseDrag(event) {
      event.preventDefault();
      event.stopPropagation();
    },

    /**
     * Determine if the carousel is currently in the visibile viewport.
     * @return {Boolean}
     */
    _isOnScreen: function _isOnScreen() {
      var rect = this.element.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
    },

    /**
     * Initialize the carousel.
     */
    init: function init() {
      this._resizeWidth = window.innerWidth;

      this._reset();
    },

    /**
     * Destroy the carousel.
     */
    destroy: function destroy() {
      this.stop();
      clearTimeout(this._resizeTimer);
    }
  };
};
handler.register('mdk-carousel', carouselComponent);

/**
 * @param  {HTMLElement} element
 * @return {Object}
 */

var tooltipComponent = function tooltipComponent(element) {
  return {
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
        value: function value() {
          var target = this.element.getAttribute('data-for');
          return document.querySelector('#' + target);
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
    listeners: ['for.show(mouseenter, touchstart)', 'for.hide(mouseleave, touchend)', 'window._debounceResize(resize)'],
    observers: ['_reset(position)'],
    mixins: [scrollTargetBehavior()],

    /**
     * A reference to the drawer layout.
     * @return {Object}
     */
    get drawerLayout() {
      var layoutNode = document.querySelector('.mdk-js-drawer-layout');

      if (layoutNode) {
        return layoutNode.mdkDrawerLayout;
      }
    },

    _reset: function _reset() {
      this.element.removeAttribute('style');
      var props = this.for.getBoundingClientRect();
      var left = props.left + props.width / 2;
      var top = props.top + props.height / 2;
      var marginLeft = -1 * (this.element.offsetWidth / 2);
      var marginTop = -1 * (this.element.offsetHeight / 2);

      if (this.position === 'left' || this.position === 'right') {
        if (top + marginTop < 0) {
          this.element.style.top = '0';
          this.element.style.marginTop = '0';
        } else {
          this.element.style.top = top + 'px';
          this.element.style.marginTop = marginTop + 'px';
        }
      } else if (left + marginLeft < 0) {
        this.element.style.left = '0';
        this.element.style.marginLeft = '0';
      } else {
        this.element.style.left = left + 'px';
        this.element.style.marginLeft = marginLeft + 'px';
      }

      if (this.position === 'top') {
        this.element.style.top = props.top - this.element.offsetHeight - 10 + 'px';
      } else if (this.position === 'right') {
        this.element.style.left = props.left + props.width + 10 + 'px';
      } else if (this.position === 'left') {
        this.element.style.left = props.left - this.element.offsetWidth - 10 + 'px';
      } else {
        this.element.style.top = props.top + props.height + 10 + 'px';
      }
    },
    _debounceResize: function _debounceResize() {
      var _this = this;

      clearTimeout(this._debounceResizeTimer);
      this._debounceResizeTimer = setTimeout(function () {
        if (window.innerWidth !== _this._debounceResizeWidth) {
          _this._debounceResizeWidth = window.innerWidth;

          _this._reset();
        }
      }, 50);
    },

    /**
     * Overrides `scrollTargetBehavior._scrollHandler`
     */
    _scrollHandler: function _scrollHandler() {
      clearTimeout(this._debounceScrollTimer);
      this._debounceScrollTimer = setTimeout(this._reset.bind(this), 50);
    },
    show: function show() {
      // this.element.style.transform = 'scale(1)'
      this.opened = true;
    },
    hide: function hide() {
      // this.element.style.transform = 'scale(0)'
      this.opened = false;
    },
    toggle: function toggle() {
      this.opened = !this.opened;
    },

    /**
     * Initialize component.
     */
    init: function init() {
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
    destroy: function destroy() {
      clearTimeout(this._debounceResizeTimer);
      clearTimeout(this._debounceScrollTimer);
      this.detachFromScrollTarget();
    }
  };
};
handler.register('mdk-tooltip', tooltipComponent);

export { HEADER_SCROLL_EFFECTS, SCROLL_EFFECTS, boxComponent, carouselComponent, drawerComponent, drawerLayoutComponent, headerComponent, headerLayoutComponent, mediaQuery, revealComponent, scrollEffectBehavior, scrollTargetBehavior, tooltipComponent };
