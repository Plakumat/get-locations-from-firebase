/* Polyfill service v3.25.1
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 * 
 * UA detected: ie/7.0.0
 * Features requested: Array.prototype.forEach
 * 
 * - Array.prototype.forEach, License: CC0 */

(function(undefined) {

// Array.prototype.forEach
Array.prototype.forEach = function forEach(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + ' is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	scope = arguments[1],
	arraylike = object instanceof String ? object.split('') : object,
	length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
	index = -1;

	while (++index < length) {
		if (index in arraylike) {
			callback.call(scope, arraylike[index], index, object);
		}
	}
};
})
.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
