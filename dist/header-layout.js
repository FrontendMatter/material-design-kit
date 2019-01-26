!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("dom-factory")):"function"==typeof define&&define.amd?define(["dom-factory"],e):"object"==typeof exports?exports.MDK=e(require("dom-factory")):t.MDK=e(t.domFactory)}(window,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=121)}([function(t,e,n){var r=n(28)("wks"),o=n(16),i=n(1).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(5);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(e,n){e.exports=t},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(7),o=n(20);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(3),o=n(34),i=n(30),u=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(1),o=n(6),i=n(9),u=n(16)("src"),c=Function.toString,f=(""+c).split("toString");n(12).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var s="function"==typeof n;s&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(s&&(i(n,u)||o(n,u,t[e]?""+t[e]:f.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n=t.exports={version:"2.6.3"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports={}},function(t,e,n){var r=n(57),o=n(58),i=n(59);t.exports=function(t){return r(t)||o(t)||i()}},function(t,e,n){var r=n(38),o=n(11);t.exports=function(t){return r(o(t))}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(1),o=n(12),i=n(6),u=n(10),c=n(18),f=function(t,e,n){var s,a,l,p,d=t&f.F,y=t&f.G,h=t&f.S,v=t&f.P,m=t&f.B,g=y?r:h?r[e]||(r[e]={}):(r[e]||{}).prototype,x=y?o:o[e]||(o[e]={}),b=x.prototype||(x.prototype={});for(s in y&&(n=e),n)l=((a=!d&&g&&void 0!==g[s])?g:n)[s],p=m&&a?c(l,r):v&&"function"==typeof l?c(Function.call,l):l,g&&u(g,s,l,t&f.U),x[s]!=l&&i(x,s,p),v&&b[s]!=l&&(b[s]=l)};r.core=o,f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},function(t,e,n){var r=n(37);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(28)("keys"),o=n(16);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(23),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(5),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(7).f,o=n(9),i=n(0)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){for(var r=n(41),o=n(31),i=n(10),u=n(1),c=n(6),f=n(13),s=n(0),a=s("iterator"),l=s("toStringTag"),p=f.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},y=o(d),h=0;h<y.length;h++){var v,m=y[h],g=d[m],x=u[m],b=x&&x.prototype;if(b&&(b[a]||c(b,a,p),b[l]||c(b,l,m),f[m]=p,g))for(v in r)b[v]||i(b,v,r[v],!0)}},function(t,e,n){var r=n(12),o=n(1),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(29)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!1},function(t,e,n){var r=n(5);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(39),o=n(24);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){"use strict";var r=n(29),o=n(17),i=n(10),u=n(6),c=n(13),f=n(54),s=n(26),a=n(55),l=n(0)("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,y,h,v,m){f(n,e,y);var g,x,b,S=function(t){if(!p&&t in T)return T[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",w="values"==h,O=!1,T=t.prototype,j=T[l]||T["@@iterator"]||h&&T[h],L=j||S(h),P=h?w?S("entries"):L:void 0,M="Array"==e&&T.entries||j;if(M&&(b=a(M.call(new t)))!==Object.prototype&&b.next&&(s(b,_,!0),r||"function"==typeof b[l]||u(b,l,d)),w&&j&&"values"!==j.name&&(O=!0,L=function(){return j.call(this)}),r&&!m||!p&&!O&&T[l]||u(T,l,L),c[e]=L,c[_]=d,h)if(g={values:w?L:S("values"),keys:v?L:S("keys"),entries:P},m)for(x in g)x in T||i(T,x,g[x]);else o(o.P+o.F*(p||O),e,g);return g}},,function(t,e,n){t.exports=!n(2)&&!n(8)(function(){return 7!=Object.defineProperty(n(25)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(3),o=n(46),i=n(24),u=n(19)("IE_PROTO"),c=function(){},f=function(){var t,e=n(25)("iframe"),r=i.length;for(e.style.display="none",n(49).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),f=t.F;r--;)delete f.prototype[i[r]];return f()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=r(t),n=new c,c.prototype=null,n[u]=t):n=f(),void 0===e?n:o(n,e)}},,function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(21);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(9),o=n(15),i=n(47)(!1),u=n(19)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),f=0,s=[];for(n in c)n!=u&&r(c,n)&&s.push(n);for(;e.length>f;)r(c,n=e[f++])&&(~i(s,n)||s.push(n));return s}},function(t,e,n){var r=n(11);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(45),o=n(42),i=n(13),u=n(15);t.exports=n(32)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},,,function(t,e,n){var r=n(0)("unscopables"),o=Array.prototype;null==o[r]&&n(6)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e,n){var r=n(7),o=n(3),i=n(31);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),c=u.length,f=0;c>f;)r.f(t,n=u[f++],e[n]);return t}},function(t,e,n){var r=n(15),o=n(22),i=n(48);t.exports=function(t){return function(e,n,u){var c,f=r(e),s=o(f.length),a=i(u,s);if(t&&n!=n){for(;s>a;)if((c=f[a++])!=c)return!0}else for(;s>a;a++)if((t||a in f)&&f[a]===n)return t||a||0;return!t&&-1}}},function(t,e,n){var r=n(23),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},,,,,function(t,e,n){"use strict";var r=n(35),o=n(20),i=n(26),u={};n(6)(u,n(0)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(9),o=n(40),i=n(19)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},,function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n(86)("fixed",function(t){return function(){return t(this,"tt","","")}})},,,function(t,e,n){var r=n(17),o=n(8),i=n(11),u=/"/g,c=function(t,e,n,r){var o=String(i(t)),c="<"+e;return""!==n&&(c+=" "+n+'="'+String(r).replace(u,"&quot;")+'"'),c+">"+o+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(c),r(r.P+r.F*o(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",n)}},,,,,,,,function(t,e,n){"use strict";n.r(e);n(27);var r=n(14),o=n.n(r),i=(n(83),n(4)),u=function(){return{properties:{hasScrollingRegion:{type:Boolean,reflectToAttribute:!0},fullbleed:{type:Boolean,reflectToAttribute:!0}},observers:["_updateScroller(hasScrollingRegion)","_updateContentPosition(hasScrollingRegion, header.fixed, header.condenses)","_updateDocument(fullbleed)"],listeners:["window._debounceResize(resize)"],get contentContainer(){return this.element.querySelector(".mdk-header-layout__content")},get header(){var t=this.element.querySelector(".mdk-header");if(t)return t.mdkHeader},_updateScroller:function(){this.header.scrollTargetSelector=this.hasScrollingRegion?this.contentContainer:null},_updateContentPosition:function(){var t=this.header.element.offsetHeight,e=parseInt(window.getComputedStyle(this.header.element).marginBottom,10),n=this.contentContainer.style;(this.header.fixed||this.header.willCondense())&&(n.paddingTop="".concat(t+e,"px"),n.marginTop="")},_debounceResize:function(){var t=this;clearTimeout(this._onResizeTimeout),this._resizeWidth!==window.innerWidth&&(this._onResizeTimeout=setTimeout(function(){t._resizeWidth=window.innerWidth,t._reset()},50))},_updateDocument:function(){var t=o()(document.querySelectorAll("html, body"));this.fullbleed&&t.forEach(function(t){t.style.height="100%"})},_reset:function(){this._updateContentPosition()},init:function(){this._resizeWidth=window.innerWidth,this._updateDocument(),this._updateScroller()},destroy:function(){clearTimeout(this._onResizeTimeout)}}};i.handler.register("mdk-header-layout",u),n.d(e,"headerLayoutComponent",function(){return u})},,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){t.exports=n(94)}])});