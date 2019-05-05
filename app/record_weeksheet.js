/*
 * RecordWeeksheet class library
 *
 * container for month, year
 * 
 */

// Dependencies
var rounding = require('./rounding');
 
class RecordWeeksheet {
    constructor(config){
        this.cfgEmploy = config.employ;
        this.inputData = results;

        this.inpFullHours = 0;
        this.inpRealHours = 0;
        this.outWorkCoeff = 0;
        this.outWorkSheet = [];
    }

    evaluate(results) {
        this.inpFullHours = results.weeklyMinutes;
        this.inpRealHours = results.weeklyMinutes;
        this.outWorkSheet = lib.WeekSchedule(this.inpRealHours, this.cfgEmploy.DAYS_WORKING_WEEKLY);
        this.outWorkCoeff = rounding.DvivideOrZero(this.inpRealHours / this.inpFullHours);
    }
}

module.exports = RecordWeeksheet;
