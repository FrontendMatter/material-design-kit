/**
 * waterfall effect
 */
export const HEADER_SCROLL_EFFECT_WATERFALL = {
  name: 'waterfall',
  run (progress, top) {
    this.element.classList[this.isOnScreen() && this.isContentBelow() ? 'add' : 'remove']('mdk-header--shadow')
  },
  tearDown () {
    this.element.classList.remove('mdk-header--shadow')
  }
}