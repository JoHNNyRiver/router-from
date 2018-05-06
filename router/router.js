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
var param = require('./param')

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
   * Atore the path defined
   * @type {Array}
   * @private
   */
  var storePath = []

  /**
   * Store the middlewares defined
   * @type {Array}
   * @private
   */
  var storeMiddleWare = []

  /**
  * @description All subscribres are here
  * @type {Array}
  * @public
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
   * Execute the middleware while less then that storeMiddleware array
   * @param  {Number} index
   * @type {Void}
   * @private
   */
  function execMiddleware (index, parameter) {
    if (index >= storeMiddleWare.length) return

    if (typeof storeMiddleWare[index] === 'object') {
      if (storePath[index] === window.location.pathname) {
        storeMiddleWare[index][storePath[index]](parameter)
        return execMiddleware(index + 1)
      }

      return execMiddleware(index + 1)
    }

    storeMiddleWare[index](parameter)
    execMiddleware(index + 1)
  }

  /**
   * verify if the path is equal for both
   * @param  {String} path
   * @param  {String} pathname
   * @return {Boolean}
   * @private
   */
  function isEqualForBoth (path, pathname) {
    path = /^\//.test(path) ? path : '/' + path

    var pathSplit = queryString.splits('/')(path) || '/'
    var pathnameSplit = queryString.splits('/')(pathname) || '/'

    return pathSplit.length === pathnameSplit.length && pathSplit[1] === pathnameSplit[1]
  }

  /**
   * Store the middlewares
   * @param  {String}   path
   * @param  {Function} callback
   * @type {Void}
   * @public
   */
  scoped.middleware = function (path, callback) {
    if (typeof path === 'function') {
      storeMiddleWare.push(path)
      return this
    }

    var middlewareObject = {}

    middlewareObject[path] = callback
    storePath.push(path)
    storeMiddleWare.push(middlewareObject)

    return this
  }

  /**
   * Recive atwo parameters one it is path and another a callback
   * @param  {String}   path
   * @param  {Function} callback
   * @return {Object}
   * @type {Void}
   * @public
   */
  scoped.from = function (path, callback) {
    if (!path || typeof callback !== 'function') {
      throw new Error('Hasn\'t all parameter\'s or aren\'t correct')
    }

    /**
     * store the path in path array
     */
    storePath.push(path)

    /**
     * @description call the method for subscribe a channel a function (callback)
     * @property {Function} subscribe
     */
    socket.subscribe(path, callback)

    /**
     * return parameters if exists, if not will return a empty object
     * @type {Object}
     */
    var params = param(path, window.location.pathname)

    /**
     * @description publish the search like a object
     */
    socket.publish(path, {query: parsedString, param: params})

    /**
    * @description let the subscribers public
    */
    scoped.subscribe.push(socket.store)

    /**
     * Verify if the path it's the same defined
     * @param  {Boolean} isEqualForBoth(path, window.location.pathname) [description]
     * @return {[type]}                       [description]
     */
    if (isEqualForBoth(path, window.location.pathname)) {
      execMiddleware(0, {query: parsedString, param: params})
      socket.emit(path)
    }

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
