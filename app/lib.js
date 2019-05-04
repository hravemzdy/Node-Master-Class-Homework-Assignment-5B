/*
 *
 * This is library for testing purpose
 *
 */

// Dependencies
Period = require('./period');
configHealth = require('./config_health'); 
configSocial = require('./config_social'); 
configTaxing = require('./config_taxing'); 
configEmploy = require('./config_employ'); 
PayrollData = require('./payroll_data');

// Create holder for library
var lib = {};

lib.roundingLib = {};

lib.periodLib = {};

lib.timesheetLib = {};

lib.payrollLib = {};

lib.roundingLib.INT_ROUNDING_CONST = 0.5;
lib.roundingLib.WEEKSUN_SUNDAY = 0;
lib.roundingLib.WEEKMON_SUNDAY = 7;

lib.roundingLib.RoundToInt = function(valueDec) {
	roundRet = Math.floor(Math.abs(valueDec) + lib.roundingLib.INT_ROUNDING_CONST);
	return (valueDec < 0 ? -(roundRet) : roundRet);
};

lib.roundingLib.RoundToCZK = function(valueDec) {
	roundRet = Math.floor(Math.abs(valueDec) + lib.roundingLib.INT_ROUNDING_CONST);
	return (valueDec < 0 ? -(roundRet) : roundRet);
};

lib.periodLib.DayOfWeekMonToSun = function(periodDateCwd) {
    // DayOfWeek Sunday = 0,
    // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6, 
    if (periodDateCwd == lib.roundingLib.WEEKSUN_SUNDAY) {
        return lib.roundingLib.WEEKMON_SUNDAY;
    } else {
        return periodDateCwd;
    } 
};

lib.periodLib.DaysInMonth = function(period) {
    period = (period instanceof Period) ? period : false;
    if (period == false) {
        return 0;
    }
    return new Date(period.getYear(), period.getMonth()-1, 0).getDate();
};

lib.periodLib.DateOfMonth = function(period, day) {
    period = (period instanceof Period) ? period : false;
    if (period == false) {
        return null;
    }
    periodDay = Math.min(Math.max(1, day), lib.periodLib.DaysInMonth(period));

    return new Date(period.getYear(), period.getMonth()-1, periodDay, 0, 0, 0); 
};

lib.periodLib.WeekDayOfMonth = function(period, day) {
    periodDate = lib.periodLib.DateOfMonth(period, day);

    if (periodDate == null) {
        return 0;
    }
    periodDateCwd = periodDate.getDay();

    return lib.periodLib.DayOfWeekMonToSun (periodDateCwd);
};

lib.periodLib.DayOfWeekFromOrdinal = function(dayOrdinal, periodBeginCwd)
{
    // dayOrdinal 1..31
    // periodBeginCwd 1..7
    // dayOfWeek 1..7

    dayOfWeek = (((dayOrdinal - 1) + (periodBeginCwd - 1)) % 7) + 1;

    return dayOfWeek;
}

lib.timesheetLib.TIME_MULTIPLY_SIXTY = 60;

lib.timesheetLib.range = function(start, count) {
    return Array.apply(0, Array(count))
      .map((element, index) => index + start);
};

lib.timesheetLib.HoursToMinutes = function(hours) {
    return lib.roundingLib.RoundToInt(hours * lib.timesheetLib.TIME_MULTIPLY_SIXTY);
};

lib.timesheetLib.WeekSchedule = function(secondsWeekly, workdaysWeekly)
{
    secondsDaily = (secondsWeekly / Math.min (workdaysWeekly, 7));

    secRemainder = secondsWeekly - (secondsDaily * workdaysWeekly);

    weekSchedule = lib.timesheetLib.range(1, 7)
        .map((x) => (lib.timesheetLib.WeekDaySeconds(x, workdaysWeekly, secondsDaily, secRemainder)));

    return weekSchedule;
};

lib.timesheetLib.WeekDaySeconds = function(dayOrdinal, daysOfWork, secondsDaily, secRemainder)
{
    if (dayOrdinal < daysOfWork) {
        return secondsDaily;
    } else if (dayOrdinal == daysOfWork) {
        return secondsDaily + secRemainder;
    }
    return (0);
};

lib.timesheetLib.WorkingSecondsDaily = function(workingHours)
{
    secondsInHour = (lib.timesheetLib.TIME_MULTIPLY_SIXTY * lib.timesheetLib.TIME_MULTIPLY_SIXTY);

    return (workingHours * secondsInHour);
};

lib.timesheetLib.SecondsFromWeekSchedule = function(period, weekSchedule, dayOrdinal, periodBeginCwd)
{
    dayOfWeek = lib.periodLib.DayOfWeekFromOrdinal(dayOrdinal, periodBeginCwd);

    indexWeek = (dayOfWeek - 1);

    if (indexWeek < 0 || indexWeek >= weekSchedule.Length) {
        return 0;
    }
    return weekSchedule [indexWeek];
}

lib.timesheetLib.MonthSchedule = function(period, weekSchedule)
{
    periodDaysCount = lib.periodLib.DaysInMonth (period);

    periodBeginCwd = lib.periodLib.WeekDayOfMonth (period, 1);

    monthSchedule = lib.timesheetLib.range(1, periodDaysCount)
        .map((x) => (lib.timesheetLib.SecondsFromWeekSchedule(period, weekSchedule, x, periodBeginCwd)));

    return monthSchedule;
};

lib.timesheetLib.TotalTimesheetHours = function(monthTimesheet)
{
    if (monthTimesheet == null) {
        return 0;
    }
    timesheetHours = monthTimesheet.reduce((agr, dh) => (agr + dh), 0);

    return timesheetHours;
}

lib.timesheetLib.WorkingTimesheet = function(period, weeklyHours) {
    workingWeeekHours = lib.timesheetLib.HoursToMinutes(weeklyHours);

    workdaysWeeklyDay = configEmploy.DAYS_WORKING_WEEKLY;

    workingWeeekSched = lib.timesheetLib.WeekSchedule(workingWeeekHours, workdaysWeeklyDay);

    workingMonthSched = lib.timesheetLib.MonthSchedule(period, workingWeeekSched);

    return workingMonthSched;
};

lib.timesheetLib.TotalWorkingHours = function(period, weeklyHours) {
    workingWeeekHours = lib.timesheetLib.HoursToMinutes(weeklyHours);

    workdaysWeeklyDay = configEmploy.DAYS_WORKING_WEEKLY;

    workingWeeekSched = lib.timesheetLib.WeekSchedule(workingWeeekHours, workdaysWeeklyDay);

    workingMonthSched = lib.timesheetLib.MonthSchedule(period, workingWeeekSched);

    workingMonthHours = lib.timesheetLib.TotalTimesheetHours(workingMonthSched);

    return workingMonthHours;

};

lib.payrollLib.SalaryResult = function(period, amount, workingMinutes, workedMinutes) {
    scheduleFactor = 1.0;

    amountFactor = (amount * scheduleFactor);

    salariedMinutes = Math.max (0, Math.min(workingMinutes, workedMinutes));

    salaryResult = ((salariedMinutes * amountFactor) / workingMinutes);

    return lib.roundingLib.RoundToCZK(salaryResult);

};

lib.GetResults = function(period, inputData) {
    const results = new PayrollData(period);
    results.workedMinutes = inputData.workedMinutes;
    results.absenceMinutes = inputData.absenceMinutes;
    results.fulltimeMinutes = lib.timesheetLib.TotalWorkingHours(period, inputData.WeeklyHours());
    var nonabsenceMinutes = Math.max(0, results.fulltimeMinutes - results.absenceMinutes);
    results.workingMinutes = Math.min(results.workedMinutes, nonabsenceMinutes);
    results.overtimeMinutes = Math.max(0, results.workedMinutes - nonabsenceMinutes);
 
    results.salaryAmount = inputData.salaryAmount;
    results.salaryResult = lib.payrollLib.SalaryResult(period, results.salaryAmount, results.fulltimeMinutes, results.workingMinutes);
    results.overtimeResult = lib.payrollLib.SalaryResult(period, results.salaryAmount, results.fulltimeMinutes, results.overtimeMinutes);

    results.bonusAmount = inputData.bonusAmount;
    results.bonusProcent100 = inputData.bonusProcent100;
    // results.BonusResult = lib.payrollLib.BonusResult(results.BonusAmount, results.BonusFactor());

    // decimal generalBasis = results.SalaryResult + results.BonusResult;
    // results.TaxComputed = TaxingService.TaxComputedResult(monthPeriod, generalBasis);

    // results.TaxAllowance = TaxingService.TaxPayerAllowance(monthPeriod);

    // results.TaxAdvance = TaxingService.TaxAdvanceResult(monthPeriod, results.TaxComputed, results.TaxAllowance);

    // results.HealthInsurance = HealthService.HealthInsuranceResult(monthPeriod, generalBasis);

    // results.SocialInsurance = SocialService.SocialInsuranceResult(monthPeriod, generalBasis);

    results.grossIncome = results.salaryResult + results.bonusResult;

    // results.NetIncome = results.GrossIncome - results.TaxAdvance - results.HealthInsurance - results.SocialInsurance;

    results.mealDeduction = inputData.mealDeduction;

    // results.NetPayment = results.NetIncome - results.MealDeduction;

    return results;
};

// Export the module
module.exports = lib;
