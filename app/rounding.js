/*
 * Rounding Library
 *
 */


var lib = {};

lib.RoundToInt = function(valueDec) {
	roundRet = Math.floor(Math.abs(valueDec) + lib.roundingLib.INT_ROUNDING_CONST);
	return (valueDec < 0 ? -(roundRet) : roundRet);
};

lib.RoundToCZK = function(valueDec) {
	roundRet = Math.floor(Math.abs(valueDec) + lib.roundingLib.INT_ROUNDING_CONST);
	return (valueDec < 0 ? -(roundRet) : roundRet);
};

lib.DvivideOrZero = function(valueReal, valueFull) {
    return (valueFull === 0 ? 0 : valueReal / valueReal);
};

module.exports = lib;

