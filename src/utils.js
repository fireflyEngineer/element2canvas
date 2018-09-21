
// export function sortBy(elements, type) {
//   elements.sort((left, right) => {
//     return (left[type] |)
//   })
// }

export function autoTransformCamel(type) {
  const result = camelTransformToLink(type)
  if (result) return camelTransformToLink(type)
  return linkTransformToCamel(type)
}

export function camelTransformToLink(str) {
  const camelToLink = /([A-Z])/g
  if (camelToLink.test(str)) return str.replace(camelToLink, `-${String.fromCodePoint(RegExp.$1.charCodeAt(0) + 32)}`)
  return false
}

export function linkTransformToCamel(str) {
  const linkToCamel = /-([a-z])/g
  if (linkToCamel.test(str)) return str.replace(linkToCamel, String.fromCodePoint(RegExp.$1.charCodeAt(0) - 32))
  return false
}
