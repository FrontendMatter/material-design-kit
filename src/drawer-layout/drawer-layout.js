import { transform, watch } from '../util'
import { mediaQuery } from '../media-query'

export const drawerLayoutComponent = (element, drawer) => {
	let component = {
		element,
		drawer,
		_mediaQuery: null,
		_responsiveWidth: '554px',
		_narrow: null,

		get mediaQuery () {
			if (this._mediaQuery) {
				return this._mediaQuery
			}
			this._mediaQuery = mediaQuery(this.responsiveMediaQuery)
			return this._mediaQuery
		},

		get forceNarrow () {
			return this.element.hasAttribute('force-narrow')
		},
		
		get narrow () {
			return this.forceNarrow ? true : this._narrow
		},

		get push () {
			return this.element.hasAttribute('push')
		},

		get responsiveWidth () {
			if (this.element.hasAttribute('responsive-width')) {
				return this.element.getAttribute('responsive-width')
			}
			return this._responsiveWidth
		},

		get contentContainer () {
			return this.element.querySelector('.mdk-drawer-layout__content')
		},

		get responsiveMediaQuery () {
			return this.forceNarrow ? '(min-width: 0px)' : `(max-width: ${ this.responsiveWidth })`
		},

		resetLayout () {
			this.drawer.opened = this.drawer.persistent = !this.narrow
			this._onDrawerChange()
		},

		_resetContent () {
			let drawer = this.drawer
			let drawerWidth = this.drawer.getWidth()
			let contentContainer = this.contentContainer

			if (!drawer.opened) {
				contentContainer.style.marginLeft = ''
				contentContainer.style.marginRight = ''
				return
			}

			if (drawer.position === 'right') {
				contentContainer.style.marginLeft = ''
				contentContainer.style.marginRight = `${ drawerWidth }px`
			}
			else {
				contentContainer.style.marginLeft = `${ drawerWidth }px`
				contentContainer.style.marginRight = ''
			}
		},

		_resetPush () {
			let drawer = this.drawer
			let drawerWidth = this.drawer.getWidth()
			let contentContainer = this.contentContainer

			if (!drawer.opened) {
				transform('translate3d(0, 0, 0)', contentContainer)

				contentContainer.style.marginLeft = ''
				contentContainer.style.marginRight = ''
				return
			}

			if (drawer.position === 'right') {
				transform(`translate3d(${ -1 * drawerWidth }px, 0, 0)`, contentContainer)

				if (!this.narrow) {
					contentContainer.style.marginLeft = `${ drawerWidth }px`
					contentContainer.style.marginRight = ''
				}
			}
			else {
				transform(`translate3d(${ drawerWidth }px, 0, 0)`, contentContainer)

				if (!this.narrow) {
					contentContainer.style.marginLeft = ''
					contentContainer.style.marginRight = `${ drawerWidth }px`
				}
			}
		},

		_setContentTransitionDuration (duration) {
			this.contentContainer.style.transitionDuration = duration
		},

		_onDrawerChange () {
			if (this.push) {
				return this._resetPush()
			}

			if (!this.narrow) {
				this._resetContent()
			}
		},

		_init () {
			// Initial render
			this._setContentTransitionDuration('0s')
			setTimeout(() => this._setContentTransitionDuration(''), 0)

			// Reactivity
			watch(this, '_narrow', this.resetLayout)
			watch(this.mediaQuery, '_queryMatches', (value) => this._narrow = value)

			// Initialize media query
			this.mediaQuery.resetMediaQuery()

			// Drawer change
			this.drawer.element.addEventListener('change.mdk.drawer', () => this._onDrawerChange())
		}
	}

	component._init()

	return component
}