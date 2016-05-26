// STYLING
import './style'

// BEHAVIORS
import { scrollTargetBehavior } from './scroll-target-behavior'
import { scrollEffectBehavior } from './scroll-effect-behavior'

// COMPONENTS
import { headerComponent } from './header'
import { boxComponent } from './box'

// SCROLL EFFECTS
import { SCROLL_EFFECTS } from './scroll-effects'

// HEADER SCROLL EFFECTS
import { HEADER_SCROLL_EFFECTS } from './header-scroll-effects'

// EXPORT BEHAVIORS
export { scrollTargetBehavior } from './scroll-target-behavior'
export { scrollEffectBehavior } from './scroll-effect-behavior'

// EXPORT COMPONENTS
export { headerComponent } from './header'
export { boxComponent } from './box'

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

// EXPORT SELF INITIALIZED COMPONENTS
export { 
	headers, 
	boxes 
}

// EXPORT DEFAULT
export default { 
	scrollTargetBehavior, 
	scrollEffectBehavior, 
	headerComponent,
	boxComponent,
	SCROLL_EFFECTS,
	HEADER_SCROLL_EFFECTS,
	headers,
	boxes
}

/* eslint spaced-comment: 0 */