!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("dom-factory")):"function"==typeof define&&define.amd?define(["dom-factory"],t):"object"==typeof exports?exports.MDK=t(require("dom-factory")):e.MDK=t(e.domFactory)}("undefined"!=typeof self?self:this,function(e){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=151)}({128:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r(129);Object.defineProperty(t,"revealComponent",{enumerable:!0,get:function(){return i.revealComponent}})},129:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.revealComponent=void 0;var i=r(15),n=t.revealComponent=function(){return{properties:{partialHeight:{reflectToAttribute:!0,type:Number,value:0},forceReveal:{type:Boolean,reflectToAttribute:!0},trigger:{value:"click",reflectToAttribute:!0},opened:{type:Boolean,reflectToAttribute:!0}},observers:["_onChange(opened)"],listeners:["_onEnter(mouseenter, touchstart)","_onLeave(mouseleave, touchend)","window._debounceResize(resize)","_onClick(click)"],get reveal(){return this.element.querySelector(".mdk-reveal__content")},get partial(){var e=this.reveal.querySelector(".mdk-reveal__partial");return e||((e=document.createElement("DIV")).classList.add("mdk-reveal__partial"),this.reveal.insertBefore(e,this.reveal.childNodes[0])),e},open:function(){this.opened=!0},close:function(){this.opened=!1},toggle:function(){this.opened=!this.opened},_reset:function(){this._translate="translateY("+-1*(this.reveal.offsetHeight-this.partialHeight)+"px)",0!==this.partialHeight&&(this.partial.style.height=this.partialHeight+"px"),this.element.style.height=this.reveal.offsetTop+this.partialHeight+"px",this.forceReveal&&!this.opened&&this.open()},_onChange:function(){i.util.transform(this.opened?this._translate:"translateY(0)",this.reveal)},_onEnter:function(){"hover"!==this.trigger||this.forceReveal||this.open()},_onClick:function(){"click"===this.trigger&&this.toggle()},_onLeave:function(){"hover"!==this.trigger||this.forceReveal||this.close()},_debounceResize:function(){var e=this;clearTimeout(this._debounceResizeTimer),this._debounceResizeTimer=setTimeout(function(){e._resizeWidth!==window.innerWidth&&(e._resizeWidth=window.innerWidth,e._reset())},50)},init:function(){this._resizeWidth=window.innerWidth},destroy:function(){clearTimeout(this._debounceResizeTimer)}}};i.handler.register("mdk-reveal",n)},15:function(t,r){t.exports=e},151:function(e,t,r){e.exports=r(128)}})});