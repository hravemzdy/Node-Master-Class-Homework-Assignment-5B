/*
 * PersonData class library
 *
 * container for input data
 * 
 */
 
// Dependencies
Period = require('./period');

var convert = {};
convert.Minutes2Hours = function(minutes){
    return minutes/60;
};

convert.Hours2Minutes= function(hours){
    return hours*60;
};

class PayrollData {
    constructor(period, weeklyHours, workedHoues, absenceHours, salaryBase, bonusBase, bonusFactor,  mealBase){
        this.period = period;
        this.weeklyMinutes  = convert.Hours2Minutes(weeklyHours);
        this.weeklyWorkDays = 0;
        this.fulltimeMinutes = 0;
        this.workingMinutes = 0;
        this.workedMinutes = convert.Hours2Minutes(workedHoues);
        this.overtimeMinutes = 0;
        this.absenceMinutes = convert.Hours2Minutes(absenceHours);
        this.salaryAmount = salaryBase; 
        this.bonusAmount = bonusBase;
        this.bonusProcent100 = bonusFactor;
        this.taxComputed = 0;
        this.taxAllowance = 0;
        this.taxAdvance = 0; 
        this.healthInsurance = 0;
        this.socialInsurance = 0;
        this.grossIncome = 0;
        this.netIncome = 0;
        this.mealDeduction = mealBase;
        this.netPayment = 0;

        this.salaryResult = 0;
        this.overtimeResult = 0;
        this.bonusResult = 0;
    }

    WeeklyHours() {
        return convert.Minutes2Hours(this.weeklyMinutes);
    }
    WorkingHours() {
        return convert.Minutes2Hours(this.workingMinutes);
    }

    WorkedHours() {
        return convert.Minutes2Hours(this.workedMinutes);
    }

    AbsenceHours() {
        return convert.Minutes2Hours(this.absenceMinutes);
    }

    BonusFactor() {
        return (this.bonusProcent100 / 100);
    }
}

module.exports = PayrollData;