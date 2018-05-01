/**
 * @author João Ribeiro <jlribeiroaugusto@gmail.com>
 * @copyright 2018
 * @description Event it's a classe that use pub/sub like a pattern for help in context of this libary
 * router from libary
 */

'use strict'

/**
 * @constructor
 */
var Event = function () {
  /**
  * store the event when subscribe
  * @type {Object}
  * @property {Object} store
  */
  this.store = {}

  /**
   * store the message using the publish method
   * @type {Object}
   * @property {Object} message
   */
  this.message = {}
}

/**
 * Subscribe events, adding a array with functions registered (callback)
 * @param  {String}   channel
 * @param  {Function} callback
 * @return {Object}
 */
Event.prototype.subscribe = function (channel, callback) {
  var current = this.store[channel] || []
  current.push(callback)

  this.store[channel] = current
}

/**
 * Will return a boolean if the property exists in store object
 * @param  {String}  channel
 * @return {Boolean}
 */
Event.prototype.isExistsProperty = function (channel) {
  return this.store.hasOwnProperty(channel)
}

/**
 * Publish object for the callback register in subscribe
 * @param  {String} channel
 * @param  {Object} message
 * @return {Object} return the class if exists the property in this.store
 */
Event.prototype.publish = function (channel, message) {
  var $exists = this.isExistsProperty(channel)

  if (!$exists) {
    throw new Error('Don\'t has the property [ ' + channel + ' ]')
  }

  this.message[channel] = message
  return this
}

/**
 * Subscribe a especific channel subscribed or the callback especific
 * @param  {String}   channel
 * @param  {Function} callback
 * @return {Object}
 */
Event.prototype.unsubscribe = function (channel, callback) {
  var $index = this.store[channel].indexOf(callback)

  if ($index > -1 && callback) {
    this.store[channel].splice($index, 1)
    return this.store[channel]
  }

  if (this.isExistsProperty(channel)) {
    this.store[channel] = []
    return this.store[channel]
  }
}

/**
 * Execute the methods subscribed if exist in store object
 * @param  {String} channel
 * @return {Boolean}
 */
Event.prototype.emit = function (channel) {
  var $exists = this.isExistsProperty(channel)
  var context = this

  if ($exists) {
    this.store[channel].forEach(function (fn) {
      fn(context.message[channel])
    })

    return true
  }

  return false
}

/**
 * exporting module Event
 * @type {Object}
 * @module Event
 */
if (exports || module) {
  module.exports = Event
}
