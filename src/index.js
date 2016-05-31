// STYLING
import './style'

// COMPONENTS
import { headerComponent } from './header'
import { headerLayoutComponent } from './header-layout'
import { boxComponent } from './box'
import { drawerComponent } from './drawer'
import { drawerLayoutComponent } from './drawer-layout'

// SCROLL EFFECTS
import { SCROLL_EFFECTS } from './scroll-effects'

// HEADER SCROLL EFFECTS
import { HEADER_SCROLL_EFFECTS } from './header-scroll-effects'

// EXPORT BEHAVIORS
export { scrollTargetBehavior } from './scroll-target-behavior'
export { scrollEffectBehavior } from './scroll-effect-behavior'

// EXPORT COMPONENTS
export { headerComponent } from './header'
export { headerLayoutComponent } from './header-layout'
export { boxComponent } from './box'
export { drawerComponent } from './drawer'
export { drawerLayoutComponent } from './drawer-layout'

// EXPORT SCROLL EFFECTS
export { SCROLL_EFFECTS } from './scroll-effects'

// EXPORT HEADER SCROLL EFFECTS
export { HEADER_SCROLL_EFFECTS } from './header-scroll-effects'

////////////////////////////////
// SELF INITIALIZE COMPONENTS //
////////////////////////////////

// SELF INITIALIZE HEADERS
let headerNodes = document.querySelectorAll('.mdk-js-header')
let headers = [...headerNodes]

headers = headers.map(element => {
  const header = headerComponent(element)
  SCROLL_EFFECTS.concat(HEADER_SCROLL_EFFECTS).map(effect => header.registerEffect(effect.name, effect))
  return header
})

// SELF INITIALIZE BOXES
let boxNodes = document.querySelectorAll('.mdk-js-box')
let boxes = [...boxNodes]

boxes = boxes.map(element => {
  const box = boxComponent(element)
  SCROLL_EFFECTS.map(effect => box.registerEffect(effect.name, effect))
  return box
})

// SELF INITIALIZE DRAWERS
let drawerNodes = document.querySelectorAll('.mdk-js-drawer')
let drawers = [...drawerNodes]

drawers = drawers.map(drawer => drawerComponent(drawer))

// SELF INITIALIZE DRAWER LAYOUTS
let drawerLayoutNodes = document.querySelectorAll('.mdk-js-drawer-layout')
let drawerLayouts = [...drawerLayoutNodes]

drawerLayouts = drawerLayouts.map(layout => {
  let drawerNode = layout.querySelector(':scope > .mdk-js-drawer')
  let drawer = drawers.find(d => d.element === drawerNode)
  return drawerLayoutComponent(layout, drawer)
})

// SELF INITIALIZE HEADER LAYOUTS
let headerLayoutNodes = document.querySelectorAll('.mdk-js-header-layout')
let headerLayouts = [...headerLayoutNodes]

headerLayouts = headerLayouts.map(layout => {
  let headerNode = layout.querySelector(':scope > .mdk-js-header')
  let header = headers.find(d => d.element === headerNode)
  return headerLayoutComponent(layout, header)
})

// EXPORT SELF INITIALIZED COMPONENTS
export { 
  headers,
  headerLayouts,
  boxes,
  drawers,
  drawerLayouts
}

/* eslint spaced-comment: 0 */