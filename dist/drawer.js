!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("dom-factory")):"function"==typeof define&&define.amd?define(["dom-factory"],e):"object"==typeof exports?exports.MDK=e(require("dom-factory")):t.MDK=e(t.domFactory)}(window,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=118)}({118:function(t,e,n){t.exports=n(96)},4:function(e,n){e.exports=t},96:function(t,e,n){"use strict";n.r(e);var r=n(4),i=function(){return{properties:{opened:{type:Boolean,reflectToAttribute:!0},persistent:{type:Boolean,reflectToAttribute:!0},align:{reflectToAttribute:!0,value:"start"},position:{reflectToAttribute:!0}},observers:["_resetPosition(align)","_fireChange(opened, persistent, align, position)","_onChangedState(_drawerState)","_onClose(opened)"],listeners:["_onTransitionend(transitionend)","scrim._onClickScrim(click)"],_drawerState:0,_DRAWER_STATE:{INIT:0,OPENED:1,OPENED_PERSISTENT:2,CLOSED:3},get contentContainer(){return this.element.querySelector(".mdk-drawer__content")},get scrim(){var t=this.element.querySelector(".mdk-drawer__scrim");return t||(t=document.createElement("DIV"),this.element.insertBefore(t,this.element.childNodes[0]),t.classList.add("mdk-drawer__scrim")),t},getWidth:function(){return this.contentContainer.offsetWidth},toggle:function(){this.opened=!this.opened},close:function(){this.opened=!1},open:function(){this.opened=!0},_onClose:function(t){t||this.element.setAttribute("data-closing",!0)},_isRTL:function(){return"rtl"===window.getComputedStyle(this.element).direction},_setTransitionDuration:function(t){this.contentContainer.style.transitionDuration=t,this.scrim.style.transitionDuration=t},_resetDrawerState:function(){var t=this._drawerState;this.opened?this._drawerState=this.persistent?this._DRAWER_STATE.OPENED_PERSISTENT:this._DRAWER_STATE.OPENED:this._drawerState=this._DRAWER_STATE.CLOSED,t!==this._drawerState&&(this.opened||this.element.removeAttribute("data-closing"),this._drawerState===this._DRAWER_STATE.OPENED?document.body.style.overflow="hidden":document.body.style.overflow="")},_resetPosition:function(){switch(this.align){case"start":return void(this.position=this._isRTL()?"right":"left");case"end":return void(this.position=this._isRTL()?"left":"right")}this.position=this.align},_fireChange:function(){this.fire("mdk-drawer-change")},_fireChanged:function(){this.fire("mdk-drawer-changed")},_onTransitionend:function(t){var e=t.target;e!==this.contentContainer&&e!==this.scrim||this._resetDrawerState()},_onClickScrim:function(t){t.preventDefault(),this.close()},_onChangedState:function(t,e){e!==this._DRAWER_STATE.INIT&&this._fireChanged()},init:function(){var t=this;this._resetPosition(),this._setTransitionDuration("0s"),setTimeout(function(){t._setTransitionDuration(""),t._resetDrawerState()},0)}}};r.handler.register("mdk-drawer",i),n.d(e,"drawerComponent",function(){return i})}})});