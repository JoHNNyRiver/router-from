/**
 * @author João Ribeiro <jlribeiroaugusto@gmail.com>
 * @copyright 2018
 * @description This function will help convert query string's in object with key and value
 */

'use strict'

/**
 * Transform strings in arrays
 * @param  {String} separate
 * @return {Function}
 */
function splits (separate) {
  return function (string) {
    return string.split(separate)
  }
}

/**
 * erase the string unwanted
 * @param  {String} erase
 * @return {Function}
 */
function unwanted (erase) {
  return function (string) {
    return string.replace(erase, '')
  }
}

var split = splits('&')
var splitValue = splits('=')
var erase = unwanted('?')

/**
 * before parse the string and transform in object I transform the string a
 * array of array
 * @param  {String} value
 * @return {Array}
 */
function beforeParse (value) {
  value = split(value)

  return value.map(function (item) {
    return splitValue(item)
  })
}

/**
 * Recive a value on parameter and return a literal object
 * @param  {String} value
 * @return {Object}
 */
function parse (value) {
  var object = {}

  if (!value) {
    return object
  }

  var valueTrate = decodeURIComponent(value)
  var arrayString = beforeParse(valueTrate)

  arrayString.reduce(function (acc, items) {
    acc[erase(items[0])] = items[1]

    return acc
  }, object)

  return object
}

/**
 * exporting module with using webpack
 */
if (module && exports) {
  module.exports.splits = splits
  module.exports.unwanted = unwanted
  module.exports.beforeParse = beforeParse
  module.exports.parse = parse
}
