!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("dom-factory")):"function"==typeof define&&define.amd?define(["dom-factory"],t):"object"==typeof exports?exports.MDK=t(require("dom-factory")):e.MDK=t(e.domFactory)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=47)}({0:function(t,n){t.exports=e},26:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(27);n.d(t,"revealComponent",function(){return r.a})},27:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(0),o=(n.n(r),function(){return{properties:{partialHeight:{reflectToAttribute:!0,value:0},forceReveal:{type:Boolean,reflectToAttribute:!0},hoverReveal:{type:Boolean,reflectToAttribute:!0},opened:{type:Boolean,reflectToAttribute:!0}},observers:["_onChange(opened)"],listeners:["_onEnter(mouseenter, touchstart)","_onLeave(mouseleave, touchend)","window._debounceResize(resize)"],get reveal(){return this.element.querySelector(".mdk-reveal__content")},get partial(){var e=this.reveal.querySelector(".mdk-reveal__partial");return e||(e=document.createElement("DIV"),e.classList.add("mdk-reveal__partial"),this.reveal.insertBefore(e,this.reveal.childNodes[0])),e},open:function(){this.opened=!0},close:function(){this.opened=!1},toggle:function(){this.opened=!this.opened},_reset:function(){var e=this,t=parseInt(window.getComputedStyle(this.reveal)["margin-top"],10),n=this.reveal.offsetHeight,o="translate3d(0, "+(n-this.partialHeight)+"px, 0)";this._translateReveal=o,this.forceReveal&&(o="translate3d(0, 0, 0)"),0!==this.partialHeight&&(this.partial.style.height=this.partialHeight+"px"),this.reveal.style.transitionDuration="0s",r.util.transform(o,this.reveal),this.element.style.height=t+n+"px",setTimeout(function(){return e.reveal.style.transitionDuration=""},0)},_onChange:function(){r.util.transform(this.opened||this.forceReveal?"translate3d(0, 0, 0)":this._translateReveal,this.reveal)},_onEnter:function(){this.hoverReveal&&!this.forceReveal&&this.open()},_onLeave:function(){this.hoverReveal&&!this.forceReveal&&this.close()},_debounceResize:function(){var e=this;clearTimeout(this._debounceResizeTimer),this._debounceResizeTimer=setTimeout(function(){e._resizeWidth!==window.innerWidth&&(e._resizeWidth=window.innerWidth,e._reset())},50)},init:function(){this._resizeWidth=window.innerWidth},destroy:function(){clearTimeout(this._debounceResizeTimer)}}});r.handler.register("mdk-reveal",o)},47:function(e,t,n){e.exports=n(26)}})});