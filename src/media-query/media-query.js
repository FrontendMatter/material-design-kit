import { watch } from 'watch-object'

export const mediaQuery = (query, isFullQuery) => {
	let mediaQuery = {
		query,
		isFullQuery,
		queryMatches: null,

		get _boundMQhandler () {
			return this._MQHandler.bind(this)
		},

		resetMediaQuery () {
			this._removeMQListener()
			this.queryMatches = null
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
			this.queryMatches = mq.matches
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
		},

		init () {
			watch(mediaQuery, 'query', mediaQuery.resetMediaQuery.bind(mediaQuery))
			mediaQuery.resetMediaQuery()
		}
	}

	mediaQuery.init()

	return mediaQuery
}