/*
 * Period Library
 *
 */

 // Dependencies
var Period = require('./period');

var lib = {};

lib.INT_ROUNDING_CONST = 0.5;
lib.WEEKSUN_SUNDAY = 0;
lib.WEEKMON_SUNDAY = 7;

lib.DayOfWeekMonToSun = function(periodDateCwd) {
    // DayOfWeek Sunday = 0,
    // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6, 
    if (periodDateCwd == lib.WEEKSUN_SUNDAY) {
        return lib.WEEKMON_SUNDAY;
    } else {
        return periodDateCwd;
    } 
};

lib.DaysInMonth = function(period) {
    period = (period instanceof Period) ? period : false;
    if (period == false) {
        return 0;
    }
    return new Date(period.getYear(), period.getMonth()-1, 0).getDate();
};

lib.DateOfMonth = function(period, day) {
    period = (period instanceof Period) ? period : false;
    if (period == false) {
        return null;
    }
    periodDay = Math.min(Math.max(1, day), lib.periodLib.DaysInMonth(period));

    return new Date(period.getYear(), period.getMonth()-1, periodDay, 0, 0, 0); 
};

lib.WeekDayOfMonth = function(period, day) {
    periodDate = lib.periodLib.DateOfMonth(period, day);

    if (periodDate == null) {
        return 0;
    }
    periodDateCwd = periodDate.getDay();

    return lib.periodLib.DayOfWeekMonToSun (periodDateCwd);
};

lib.DayOfWeekFromOrdinal = function(dayOrdinal, periodBeginCwd)
{
    // dayOrdinal 1..31
    // periodBeginCwd 1..7
    // dayOfWeek 1..7

    dayOfWeek = (((dayOrdinal - 1) + (periodBeginCwd - 1)) % 7) + 1;

    return dayOfWeek;
}

module.exports = lib;

