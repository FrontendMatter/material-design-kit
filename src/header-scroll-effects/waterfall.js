/**
 * waterfall effect
 */
export const HEADER_SCROLL_EFFECT_WATERFALL = {
  name: 'waterfall',
  run (progress, top) {
    this.shadow = this.isOnScreen() && this.isContentBelow()
  },
  tearDown () {
    this.shadow = false
  }
}