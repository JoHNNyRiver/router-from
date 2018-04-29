/**
 * @author João Ribeiro <jlribeiroaugusto@gmail.com>
 * @copyright 2018
 * @description Event it's a classe that use pub/sub like a pattern for help in context of this libary
 * router from
 */

'use strict'

var Event = function () {}

Event.prototype.subscribe = function (channel, callback) {}

Event.prototype.publish = function (channel, message) {}

Event.prototype.unsubscribe = function (channel, callback) {}

Event.prototype.emit = function (channel) {}
