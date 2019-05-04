/*
 *
 * This is a Test case container
 *
 */

// Dependencies
var lib = require('./../app/lib');
var assert = require('assert');

// Creaate container for tests
var unit = {};

unit['fizzBuzzFor15 should return array with 1,2,Fizz,4,Buzz,Fizz,7,8,9,Buzz,11,Fizz,13,14,FizzBuzz'] = function(done){
  var results = lib.fizzBuzzFor15();
  assert.ok(results instanceof Array);
  assert.equal(results.length, 15);
  assert.deepEqual(results, ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']);
  done();
};

unit['fizzBuzzFor30 should return array with 16,17,Fizz,19,Buzz,Fizz,22,23,Fizz,Buzz,26,Fizz,28,29,Buzz'] = function(done){
  var results = lib.fizzBuzzFor30();
  assert.ok(results instanceof Array);
  assert.equal(results.length, 15);
  assert.deepEqual(results, ['16','17','Fizz','19','Buzz','Fizz','22','23','Fizz','Buzz','26','Fizz','28','29','FizzBuzz']);
  done();
};

unit['fizzBuzzFor100 should not throw any error'] = function(done){
  assert.doesNotThrow(function(){
    lib.fizzBuzzFor100(function(err, data){
      assert.equal(err, false);
      done();  
    });
  }, TypeError);
};

unit['fizzBuzzForZero should throw error'] = function(done){
  assert.throws(function(){
    lib.fizzBuzzForZero();
  }, 
  Error);
  done();
};

// Export the test container to the test runner
module.exports = unit;
