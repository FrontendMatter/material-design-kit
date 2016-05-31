/**
 * Transform style
 * @param  {String} value       The transform value
 * @param  {HTMLElement} element  The element to apply transforms to
 */
export const transform = (value, element) => {
  const properties = [
    'transform',
    'WebkitTransform',
    'msTransform',
    'MozTransform',
    'OTransform'
  ]
  properties.map(p => element.style[p] = value)
}