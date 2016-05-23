// STYLING
import './sass/style'

// BEHAVIORS
import { ScrollTargetBehavior } from './scroll-target'
import { ScrollEffectBehavior } from './scroll-effect'

// COMPONENTS
import { HeaderComponent } from './header'

// HEADER EFFECTS
import { HEADER_EFFECTS } from './header-effects'

// EXPORT BEHAVIORS
export { ScrollTargetBehavior } from './scroll-target'
export { ScrollEffectBehavior } from './scroll-effect'

// EXPORT COMPONENTS
export { HeaderComponent } from './header'

// EXPORT HEADER EFFECTS
export { HEADER_EFFECTS } from './header-effects'

let headerNodes = document.querySelectorAll('.mdk-js-header')
let headerInstances = [...headerNodes]

headerInstances = headerInstances.map(element => {
	let header = new HeaderComponent(element)
	HEADER_EFFECTS.map(effect => header.registerEffect(effect.name, effect))
	return header
})

// EXPORT DEFAULT
export default { 
	ScrollTargetBehavior, 
	ScrollEffectBehavior, 
	HeaderComponent,
	HEADER_EFFECTS,
	headerInstances
}