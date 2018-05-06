/**
 * @author João Ribeiro <jlribeiroaugusto@gmail.com>
 * @copyright 2018
 * @description This function it's a help for path recived in router.js
 */

'use strict'

var queryString = require('./queryString')

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
 * Add slash first if not has slash in begin of the string
 * @param {String} target
 */
function addSlash (target) {
  if (!/^\//.test(target)) {
    return '/' + target
  }
}

/**
 * replace the two dots to build params object
 * @param  {Array} target
 * @return {Array}
 */
function replaceTwoDots (target) {
  return target.map(function (item) {
    return item.replace(':', '')
  })
}

/**
 * return the values of the params pbject
 * @param  {Array} target
 * @param  {Array} keys
 * @return {Array}
 */
function valueOfParams (target, keys) {
  return target.filter(function (item, index) {
    return item !== keys[index]
  })
}

/**
 * Function has respnse that generate the params
 * @param  {Object} object
 * @param  {Array} target
 * @param  {Array} value
 * @param  {Number} index
 * @return {Object}
 */
function generateParams (object, target, value, index) {
  if (index >= target.length) {
    return object
  }

  object[target[index]] = value[index]
  return generateParams(object, target, value, index + 1)
}

/**
 * @param  {String} path
 * @param  {String} currentPath
 * @return {Object}
 */
function param (path, currentPath) {
  var arrayPath = hasParam(path)

  if (!arrayPath) return {}

  var splitCurrentPath = queryString.splits('/')(currentPath)
  var splitPath = queryString.splits('/')(addSlash(path))
  var newPath = replaceTwoDots(arrayPath)
  var values = valueOfParams(splitCurrentPath, splitPath)

  return generateParams({}, newPath, values, 0)
}

if (module && exports) {
  module.exports = param
}
