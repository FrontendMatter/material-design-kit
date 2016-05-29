import { watch } from '../util'

export const mediaQuery = (query, isFullQuery) => {
	let mediaQuery = {
		query,
		isFullQuery,
		_queryMatches: null,

		get _boundMQhandler () {
			return this._MQHandler.bind(this)
		},

		get queryMatches () {
			return this._queryMatches
		},

		resetMediaQuery () {
			this._removeMQListener()
			this._queryMatches = null
			let query = this.query
			if (!query) {
				return
			}
			if (!this.isFullQuery && query[0] !== '(') {
				query = `(${ query })`
			}
			this._mediaQueryList = window.matchMedia(query)
			this._addMQListener()
			this._MQHandler(this._mediaQueryList)
		},

		_MQHandler (mq) {
			this._queryMatches = mq.matches
		},

		_addMQListener () {
			if (this._mediaQueryList) {
				this._mediaQueryList.addListener(this._boundMQhandler)
			}
		},

		_removeMQListener () {
			if (this._mediaQueryList) {
				this._mediaQueryList.removeListener(this._boundMQhandler)
			}
			this._mediaQueryList = null
		}
	}

	watch(mediaQuery, 'query', mediaQuery.resetMediaQuery.bind(mediaQuery))

	mediaQuery.resetMediaQuery()

	return mediaQuery
}