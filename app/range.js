/*
 * Range Library
 *
 */

var lib = {};
 
lib.create = function(start, count) {
    return Array.apply(0, Array(count))
      .map((element, index) => index + start);
};

module.exports = lib;

