/**
 * @author João Ribeiro <jlribeiroaugusto@gmail.com>
 * @copyright 2018
 * @description Router it's where the magic happens
 */

'use strict'

/**
 * Module imported
 * @module
 */
var Event = require('../events/Events')
var queryString = require('./queryString')

/**
 * @description Router will be responsable for
 * execute the definitions recive on functions
 */
var Router = (function () {
  /**
  * export the functions and property
  * @type {Object}
  */
  var scoped = {}

  /**
  * @description All subscribres are here
  * @type {Array}
  */
  scoped.subscribe = []

  /**
   * @description Take a window location serach and parser
   * @type {Object}
   */
  var parsedString = queryString.parse(window.location.search || '')

  /**
   * Instace of Events Class
   * @type {Event}
   */
  var socket = new Event()

  /**
   * Recive atwo parameters one it is path and another a callback
   * @param  {String}   path
   * @param  {Function} callback
   * @return {Object}
   */
  scoped.from = function (path, callback) {
    if (!path || typeof callback !== 'function') {
      throw new Error('Hasn\'t all parameter\'s or aren\'t correct')
    }

    /**
     * @description call the method for subscribe a channel a function (callback)
     * @property {Function} subscribe
     */
    socket.subscribe(path, callback)

    /**
     * @description publish the search like a object
     */
    socket.publish(path, {query: parsedString})

    /**
    * @description let the subscribers public
    */
    scoped.subscribe.push(socket.store)

    return this
  }

  return scoped
})()

/**
 * Verify if you are using webpack or another bundle
 */
if (exports && module) {
  module.exports = Router
}
