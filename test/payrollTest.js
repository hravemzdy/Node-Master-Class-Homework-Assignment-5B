/*
 *
 * This is a Test case container
 *
 */

// Dependencies
var Period = require('./../app/period');
var lib = require('./../app/lib');
var assert = require('assert');

// Creaate container for tests
var unit = {};

unit['TotalWorkingHours should return 184 for period January 2019'] = function(done){
  var testPeriod = new Period(2019, 1);
  var payrollData = new PayrollData(testPeriod, 40, 184, 20, 12345, 98765, 33, 321);
  var results = lib.GetResults(testPeriod, payrollData);
  assert.equal(results.WorkingHours(), 184);
  assert.equal(results.salaryAmount, 12345);
  assert.equal(results.fulltimeMinutes, 11040);
  assert.equal(results.workingMinutes, 11040);
  assert.equal(results.salaryResult, 12345);
  assert.equal(results.overtimeResult, 1);
  done();
};

// Export the test container to the test runner
module.exports = unit;
