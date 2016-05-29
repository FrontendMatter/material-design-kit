export const drawerComponent = (element) => {
	let component = {

		// HTMLElement
		element,

		_align: 'left',

		// The current drawer state
		_drawerState: 0,

		// Possible drawer states
		_DRAWER_STATE: {
			INIT: 0,
			OPENED: 1,
			OPENED_PERSISTENT: 2,
			CLOSED: 3
		},

		get opened () {
			return this.element.hasAttribute('opened')
		},

		set opened (opened) {
			this.element[opened ? 'setAttribute' : 'removeAttribute']('opened', 'opened')
			this.fire('change.mdk.drawer')
		},

		get persistent () {
			return this.element.hasAttribute('persistent')
		},

		set persistent (persistent) {
			this.element[persistent ? 'setAttribute' : 'removeAttribute']('persistent', 'persistent')
		},

		get align () {
			if (this.element.hasAttribute('align')) {
				return this.element.getAttribute('align')
			}
			return this._align
		},

		get position () {
			return this.element.getAttribute('position')
		},

		set position (position) {
			this.element.setAttribute('position', position)
		},

		get contentContainer () {
			return this.element.querySelector('.mdk-drawer__content')
		},

		get scrim () {
			let scrim = this.element.querySelector('.mdk-drawer__scrim')
			if (!scrim) {
				scrim = document.createElement('DIV')
				this.element.insertBefore(scrim, this.element.childNodes[0])
				scrim.classList.add('mdk-drawer__scrim')
			}
			return scrim
		},

		attach () {
			this._setTransitionDuration('0s')
			setTimeout(() => {
				this._setTransitionDuration('')
				this._resetPosition()
				this._resetDrawerState()

				this.scrim.addEventListener('click', event => {
					event.preventDefault()
					this.close()
				})

				this.element.addEventListener('transitionend', this._transitionend.bind(this))
			}, 0)
		},

		getWidth () {
			return this.contentContainer.offsetWidth
		},

		toggle () {
			this.opened = !this.opened
		},

		close () {
			this.opened = false
		},

		open () {
			this.opened = true
		},

		resetLayout () {
			setTimeout(() => this.fire('changed.mdk.drawer'), 0)
		},

		fire (eventName) {
			let event = document.createEvent('Event')
			event.initEvent(eventName, true, true)
			this.element.dispatchEvent(event)
		},

		_transitionend (event) {
			let target = event.target
			if (target === this.contentContainer || target === this.scrim) {
				this._resetDrawerState()
			}
		},

		_isRTL () {
			return window.getComputedStyle(this.element).direction === 'rtl'
		},

		_resetPosition () {
			switch (this.align) {
				case 'start':
					this.position = this._isRTL() ? 'right' : 'left'
					return
				case 'end':
					this.position = this._isRTL() ? 'left' : 'right'
					return
			}
			this.position = this.align
		},

		_setTransitionDuration (duration) {
			this.contentContainer.style.transitionDuration = duration
			this.scrim.style.transitionDuration = duration
		},

		_resetDrawerState () {
			let oldState = this._drawerState
			if (this.opened) {
				this._drawerState = this.persistent 
					? this._DRAWER_STATE.OPENED_PERSISTENT : this._DRAWER_STATE.OPENED
			}
			else {
				this._drawerState = this._DRAWER_STATE.CLOSED
			}

			if (oldState !== this._drawerState) {
				if (this._drawerState === this._DRAWER_STATE.OPENED) {
					document.body.style.overflow = 'hidden'
				}
				else {
					document.body.style.overflow = ''
				}
			}

			if (oldState !== this._DRAWER_STATE.INIT) {
				this.fire('changed.mdk.drawer')
			}
		}
	}

	component.attach()

	return component
}