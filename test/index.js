/*
 *
 * Test runner
 *
 */

// Dependencies
var lib = require('./../app/lib');

// Create the container for tests
var _app = {};

_app.tests = {};

_app.tests.fizzBuzz = require('./payrollTest');

_app.countTests = function(){
  var counter = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)){
      var subTests = _app.tests[key];
      for (var subKey in subTests) {
        if (subTests.hasOwnProperty(subKey)){
          counter++;
        }
      }
    }
  }
  return counter;
};

// Run all the tests, collection errors and succeses of the tests
_app.runTests = function() {
  var errors= [];
  var successes = 0;
  var limit = _app.countTests();
  var counter = 0;

  console.log('');
  console.log('------------------ BEGIN RUNING TESTS --------------------------');
  console.log('');
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)){
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if(subTests.hasOwnProperty(testName)){
          (function(){
            var tempTestName = testName;
            var testValue = subTests[testName];
            // Call the test
            try{
              testValue(function(){
                // If it calles back without thrownig, then it succeded, so log it in green
                console.log('\x1b[32m%s\x1b[0m', tempTestName);
                counter++;
                successes++;
                if (counter == limit){
                  _app.produceTestReport(limit, successes, errors);
                }
              });
            }catch(err){
                // if asswrtion throws, then it failed, so capture the error thrown and log it in red
                errors.push({
                  'name' : tempTestName,
                  'error' : err}
                );
                console.log('\x1b[31m%s\x1b[0m', tempTestName);
                counter++;
                if (counter == limit){
                  _app.produceTestReport(limit, successes, errors);
                }
            }
          })();
        }
      }
    }
  }
};

// Produce a test outcome report
_app.produceTestReport = function(limit,successes,errors){
  console.log('');
  console.log('------------------ BEGIN TEST REPORT ---------------------------');
  console.log('');
  console.log('Total tests: ', limit);
  console.log('Pass: ', successes);
  console.log('Fail: ', errors.length);
  console.log('');

  // If there are errors, print them in detail
  if (errors.length > 0){
    console.log('------------------ BEGIN ERROR DEATILS ---------------------------');
    console.log('');

    errors.forEach(function(testError){
      console.log('\x1b[31m%s\x1b[0m', testError.name);
      console.log(testError.error);
      console.log('');
    });
    console.log('');
    console.log('------------------ END ERROR DEATILS -----------------------------');
  }
  console.log('');
  console.log('------------------ END TEST REPORT -----------------------------');
};

// Run the tests
_app.runTests();
