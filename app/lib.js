/*
 *
 * This is library for testing purpose
 *
 */

// Dependencies
var Period = require('./period');
var config = require('./config');
var PayrollData = require('./payroll_data');
var RecordWeeksheet = require('./record_weeksheet');
var rounding = require('./rounding');
var periodUtils = require('./period_utils');
var tsheetUtils = require('./timesheet_utils');

// Create holder for library
var lib = {};

lib.payrollLib = {};

lib.payrollLib.SalaryResult = function(amount, scheduleFactor, fulltimeMinutes, worktimeMinutes) {
    if (fulltimeMinutes === 0) {
        return 0;
    }
    amountFactor = (amount * scheduleFactor);

    salariedMinutes = Math.max (0, Math.min(fulltimeMinutes, worktimeMinutes));

    salaryResult = ((salariedMinutes * amountFactor) / fulltimeMinutes);

    return rounding.RoundToCZK(salaryResult);
};

lib.GetResults = function(period, inputData) {
    const results = new PayrollData(period);

    var RecWeeksheet = new RecordWeeksheet(config);

    RecWeeksheet.evaluate(results);

    results.workedMinutes = inputData.workedMinutes;
    results.absenceMinutes = inputData.absenceMinutes;
    results.fulltimeMinutes = tsheetUtils.TotalWorkingHours(period, inputData.WeeklyHours(), config.employ.DAYS_WORKING_WEEKLY);
    var nonabsenceMinutes = Math.max(0, results.fulltimeMinutes - results.absenceMinutes);
    results.workingMinutes = Math.min(results.workedMinutes, nonabsenceMinutes);
    results.overtimeMinutes = Math.max(0, results.workedMinutes - nonabsenceMinutes);
 
    results.salaryAmount = inputData.salaryAmount;
    results.salaryResult = lib.payrollLib.SalaryResult(period, 1.0, results.salaryAmount, results.fulltimeMinutes, results.workingMinutes);
    results.overtimeResult = lib.payrollLib.SalaryResult(period, 1.0, results.salaryAmount, results.fulltimeMinutes, results.overtimeMinutes);

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
