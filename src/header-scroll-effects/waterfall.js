/**
 * waterfall effect
 */
export const HEADER_SCROLL_EFFECT_WATERFALL = {
  name: 'waterfall',
  setUp () {
    this._primary.classList.add('mdk-header--shadow')
  },
  run (progress, top) {
    this._primary.classList[this.isOnScreen() && this.isContentBelow() ? 'add' : 'remove']('mdk-header--shadow-show')
  },
  tearDown () {
    this._primary.classList.remove('mdk-header--shadow')
  }
}