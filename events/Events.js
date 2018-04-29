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
  */
  this.store = {}

  /**
   * store the message using the publish method
   * @type {Object}
   */
  this.message = {}
}

/**
 * Subscribe events
 * @param  {String}   channel
 * @param  {Function} callback
 * @return {Object}
 */
Event.prototype.subscribe = function (channel, callback) {}

Event.prototype.publish = function (channel, message) {}

Event.prototype.unsubscribe = function (channel, callback) {}

Event.prototype.emit = function (channel) {}

/**
 * exporting module Event
 * @type {Object}
 * @module Event
 */
if (exports || module) {
  module.exports = Event
}
