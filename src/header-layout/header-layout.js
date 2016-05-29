export const headerLayoutComponent = (element, header) => {
	let component = {
		element,
		header,

		get hasScrollingRegion () {
			return this.element.hasAttribute('has-scrolling-region')
		},

		set hasScrollingRegion (value) {
			this.element[value ? 'setAttribute' : 'removeAttribute']('has-scrolling-region', 'has-scrolling-region')
		},

		get contentContainer () {
			return this.element.querySelector(':scope > .mdk-header-layout__content')
		},

		resetLayout () {
			this._updateScroller()
			setTimeout(() => this._updateContentPosition(), 0)
		},

		_updateScroller () {
			if (this.header) {
				const scrollTarget = this.hasScrollingRegion 
					? this.contentContainer 
					: this.element.ownerDocument.documentElement

				this.header.attachToScrollTarget(scrollTarget)
				this.header._setUpFixedPositionedScroll()
			}
		},

		_updateContentPosition () {
			const headerHeight = this.header.element.offsetHeight
			let containerStyle = this.contentContainer.style
			
			if (this.header.fixed && !this.header.willCondense() && this.hasScrollingRegion) {
				containerStyle.marginTop = `${ headerHeight }px`
				containerStyle.paddingTop = ''
			}
			else {
				containerStyle.paddingTop = `${ headerHeight }px`
				containerStyle.marginTop = ''
			}
		}
	}

	component.resetLayout()

	return component
}