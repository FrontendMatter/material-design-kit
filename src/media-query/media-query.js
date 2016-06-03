import { watch, unwatch } from 'watch-object'

/**
 * Bind to a CSS media query
 * @param  {String} query The CSS media query
 * @return {Object}
 */
export const mediaQuery = (query) => {
  let mediaQuery = {

    // The CSS media query
    query,

    // CSS media query matches
    queryMatches: null,

    _reset () {
      this._removeListener()
      this.queryMatches = null
      if (!this.query) {
        return
      }
      this._mq = window.matchMedia(this.query)
      this._addListener()
      this._handler(this._mq)
    },

    _handler (mq) {
      this.queryMatches = mq.matches
    },

    _addListener () {
      if (this._mq) {
        this._mq.addListener(this._handler)
      }
    },

    _removeListener () {
      if (this._mq) {
        this._mq.removeListener(this._handler)
      }
      this._mq = null
    },

    /**
     * Initialize mediaQuery
     */
    init () {
      watch(this, 'query', this._reset)
      this._reset()
    },

    /**
     * Destroy mediaQuery
     * @return {[type]} [description]
     */
    destroy () {
      unwatch(this, 'query', this._reset)
      this._removeListener()
    }
  }

  // Bind handlers
  mediaQuery._reset = mediaQuery._reset.bind(mediaQuery)
  mediaQuery._handler = mediaQuery._handler.bind(mediaQuery)

  // Initialize mediaQuery
  mediaQuery.init()

  return mediaQuery
}