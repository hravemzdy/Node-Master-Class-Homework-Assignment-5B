/*
 * Period class library
 *
 * container for month, year
 * 
 */
 
class Period {
    constructor(year, month){
       year = year || 2000;
       month = month || 1;
       this.code = year*100 + month;
    }

    getMonth() {
       return this.code % 100;
    } 

    getYear() {
       return Math.floor(this.code / 100);
    }
}

module.exports = Period;


