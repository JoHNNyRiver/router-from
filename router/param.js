/**
 * @author João Ribeiro <jlribeiroaugusto@gmail.com>
 * @copyright 2018
 * @description This function it's a help for path recived in router.js
 */

var regex = /:\w+/gmi

/**
 * @param  {String} path
 * @return {Array}
 */
function hasParam (path) {
  if (regex.test(path)) {
    return path.match(regex)
  }

  return false
}

/**
 * @param  {String} path
 * @param  {String} currentPath
 * @return {Object}
 */
function param (path, currentPath) {
  var arrayPath = hasParam(path)
  var objPath = {}

  if (!arrayPath) {
    return objPath
  }
}

if (module && exports) {
  module.exports = param
}
