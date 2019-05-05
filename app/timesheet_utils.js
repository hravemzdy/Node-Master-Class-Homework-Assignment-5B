/*
 * Timesheet Library
 *
 */

// Dependencies
var Period = require('./period');
var range = require('./range');
var rounding = require('./rounding');

var lib = {};
 
lib.TIME_MULTIPLY_SIXTY = 60;

lib.HoursToMinutes = function(hours) {
    return rounding.RoundToInt(hours * lib.TIME_MULTIPLY_SIXTY);
};

lib.WeekSchedule = function(secondsWeekly, workdaysWeekly)
{
    secondsDaily = (secondsWeekly / Math.min (workdaysWeekly, 7));

    secRemainder = secondsWeekly - (secondsDaily * workdaysWeekly);

    weekSchedule = range.create(1, 7)
        .map((x) => (lib.WeekDaySeconds(x, workdaysWeekly, secondsDaily, secRemainder)));

    return weekSchedule;
};

lib.WeekDaySeconds = function(dayOrdinal, daysOfWork, secondsDaily, secRemainder)
{
    if (dayOrdinal < daysOfWork) {
        return secondsDaily;
    } else if (dayOrdinal == daysOfWork) {
        return secondsDaily + secRemainder;
    }
    return (0);
};

lib.WorkingSecondsDaily = function(workingHours)
{
    secondsInHour = (lib.TIME_MULTIPLY_SIXTY * lib.TIME_MULTIPLY_SIXTY);

    return (workingHours * secondsInHour);
};

lib.SecondsFromWeekSchedule = function(period, weekSchedule, dayOrdinal, periodBeginCwd)
{
    dayOfWeek = periodUtils.DayOfWeekFromOrdinal(dayOrdinal, periodBeginCwd);

    indexWeek = (dayOfWeek - 1);

    if (indexWeek < 0 || indexWeek >= weekSchedule.Length) {
        return 0;
    }
    return weekSchedule [indexWeek];
}

lib.MonthSchedule = function(period, weekSchedule)
{
    periodDaysCount = periodUtils.DaysInMonth (period);

    periodBeginCwd = periodUtils.WeekDayOfMonth (period, 1);

    monthSchedule = range.create(1, periodDaysCount)
        .map((x) => (lib.SecondsFromWeekSchedule(period, weekSchedule, x, periodBeginCwd)));

    return monthSchedule;
};

lib.TotalTimesheetHours = function(monthTimesheet)
{
    if (monthTimesheet == null) {
        return 0;
    }
    timesheetHours = monthTimesheet.reduce((agr, dh) => (agr + dh), 0);

    return timesheetHours;
}

lib.WorkingTimesheet = function(period, weeklyHours, workingDays) {
    workingWeeekHours = lib.HoursToMinutes(weeklyHours);

    workdaysWeeklyDay = workingDays;

    workingWeeekSched = lib.WeekSchedule(workingWeeekHours, workdaysWeeklyDay);

    workingMonthSched = lib.MonthSchedule(period, workingWeeekSched);

    return workingMonthSched;
};

lib.TotalWorkingHours = function(period, weeklyHours, workingDays) {
    workingWeeekHours = lib.HoursToMinutes(weeklyHours);

    workdaysWeeklyDay = workingDays;

    workingWeeekSched = lib.WeekSchedule(workingWeeekHours, workdaysWeeklyDay);

    workingMonthSched = lib.MonthSchedule(period, workingWeeekSched);

    workingMonthHours = lib.TotalTimesheetHours(workingMonthSched);

    return workingMonthHours;

};

module.exports = lib;
 
 