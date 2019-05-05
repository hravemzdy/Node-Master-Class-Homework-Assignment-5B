/*
 * Config Constants
 *
 */

// Dependencies
var configHealth = require('./config_health'); 
var configSocial = require('./config_social'); 
var configTaxing = require('./config_taxing'); 
var configEmploy = require('./config_employ'); 

var config = {};

config.health = configHealth;
config.social = configSocial;
config.taxing = configTaxing;
config.employ = configEmploy;

module.exports = config;

