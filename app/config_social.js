/*
 * Social Insurance Constants
 *
 */

var options = {};

options.Guides2011 = {};
options.Guides2012 = {};
options.Guides2013 = {};
options.Guides2014 = {};
options.Guides2015 = {};
options.Guides2016 = {};
options.Guides2017 = {};
options.Guides2018 = {};
options.Guides2019 = {};

options.Guides2011.YEAR = 2011; 
options.Guides2011.BASIS_MANDATORY = 0; 
options.Guides2011.BASIS_ANNUAL_MAXIMUM = 1781280; 
options.Guides2011.FACTOR_EMPLOYER = 25.0; 
options.Guides2011.FACTOR_EMPLOYER_ELEVATED = 26.0; 
options.Guides2011.FACTOR_EMPLOYEE = 6.5; 
options.Guides2011.FACTOR_EMPLOYEE_GARANT = 0.0; 
options.Guides2011.FACTOR_REDUCE_GARANT = 0.0; 
options.Guides2011.INCOME_EMPLOY_MARGINAL = 2000; 
options.Guides2011.INCOME_AGREEM_MARGINAL = 0; 

options.Guides2012.YEAR = 2012; 
options.Guides2012.BASIS_MANDATORY = 0; 
options.Guides2012.BASIS_ANNUAL_MAXIMUM = 1206576; 
options.Guides2012.FACTOR_EMPLOYER = 25.0; 
options.Guides2012.FACTOR_EMPLOYER_ELEVATED = 26.0; 
options.Guides2012.FACTOR_EMPLOYEE = 6.5; 
options.Guides2012.FACTOR_EMPLOYEE_GARANT = 0.0; 
options.Guides2012.FACTOR_REDUCE_GARANT = 0.0; 
options.Guides2012.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2012.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2013.YEAR = 2013; 
options.Guides2013.BASIS_MANDATORY = 0; 
options.Guides2013.BASIS_ANNUAL_MAXIMUM = 1242432; 
options.Guides2013.FACTOR_EMPLOYER = 25.0; 
options.Guides2013.FACTOR_EMPLOYER_ELEVATED = 26.0; 
options.Guides2013.FACTOR_EMPLOYEE = 6.5; 
options.Guides2013.FACTOR_EMPLOYEE_GARANT = 5.0; 
options.Guides2013.FACTOR_REDUCE_GARANT = 3.0; 
options.Guides2013.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2013.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2014.YEAR = 2014; 
options.Guides2014.BASIS_MANDATORY = 0; 
options.Guides2014.BASIS_ANNUAL_MAXIMUM = 1245216; 
options.Guides2014.FACTOR_EMPLOYER = 25.0; 
options.Guides2014.FACTOR_EMPLOYER_ELEVATED = 26.0; 
options.Guides2014.FACTOR_EMPLOYEE = 6.5; 
options.Guides2014.FACTOR_EMPLOYEE_GARANT = 5.0; 
options.Guides2014.FACTOR_REDUCE_GARANT = 3.0; 
options.Guides2014.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2014.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2015.YEAR = 2015; 
options.Guides2015.BASIS_MANDATORY = 0; 
options.Guides2015.BASIS_ANNUAL_MAXIMUM = 1277328; 
options.Guides2015.FACTOR_EMPLOYER = 25.0; 
options.Guides2015.FACTOR_EMPLOYER_ELEVATED = 25.0; 
options.Guides2015.FACTOR_EMPLOYEE = 6.5; 
options.Guides2015.FACTOR_EMPLOYEE_GARANT = 5.0; 
options.Guides2015.FACTOR_REDUCE_GARANT = 3.0; 
options.Guides2015.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2015.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2016.YEAR = 2016; 
options.Guides2016.BASIS_MANDATORY = 0; 
options.Guides2016.BASIS_ANNUAL_MAXIMUM = 1296288; 
options.Guides2016.FACTOR_EMPLOYER = 25.0; 
options.Guides2016.FACTOR_EMPLOYER_ELEVATED = 25.0; 
options.Guides2016.FACTOR_EMPLOYEE = 6.5; 
options.Guides2016.FACTOR_EMPLOYEE_GARANT = 0.0; 
options.Guides2016.FACTOR_REDUCE_GARANT = 0.0; 
options.Guides2016.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2016.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2017.YEAR = 2017; 
options.Guides2017.BASIS_MANDATORY = 0; 
options.Guides2017.BASIS_ANNUAL_MAXIMUM = 1355136; 
options.Guides2017.FACTOR_EMPLOYER = 25.0; 
options.Guides2017.FACTOR_EMPLOYER_ELEVATED = 25.0; 
options.Guides2017.FACTOR_EMPLOYEE = 6.5; 
options.Guides2017.FACTOR_EMPLOYEE_GARANT = 0.0; 
options.Guides2017.FACTOR_REDUCE_GARANT = 0.0; 
options.Guides2017.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2017.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2018.YEAR = 2018; 
options.Guides2018.BASIS_MANDATORY = 0; 
options.Guides2018.BASIS_ANNUAL_MAXIMUM = 1438992; 
options.Guides2018.FACTOR_EMPLOYER = 25.0; 
options.Guides2018.FACTOR_EMPLOYER_ELEVATED = 25.0; 
options.Guides2018.FACTOR_EMPLOYEE = 6.5; 
options.Guides2018.FACTOR_EMPLOYEE_GARANT = 0.0; 
options.Guides2018.FACTOR_REDUCE_GARANT = 0.0; 
options.Guides2018.INCOME_EMPLOY_MARGINAL = 2500; 
options.Guides2011.INCOME_AGREEM_MARGINAL = 10000; 

options.Guides2019.YEAR = 2019; 
options.Guides2019.BASIS_MANDATORY = 0; 
options.Guides2019.BASIS_ANNUAL_MAXIMUM = 1569552; 
options.Guides2019.FACTOR_EMPLOYER = 25.0; 
options.Guides2019.FACTOR_EMPLOYER_ELEVATED = 25.0; 
options.Guides2019.FACTOR_EMPLOYEE = 6.5; 
options.Guides2019.FACTOR_EMPLOYEE_GARANT = 0.0; 
options.Guides2019.FACTOR_REDUCE_GARANT = 0.0; 
options.Guides2019.INCOME_EMPLOY_MARGINAL = 3000; 
options.Guides2019.INCOME_AGREEM_MARGINAL = 10000; 

// Determining with environment was passed as a command-line argument
var currentOptYear = typeof(process.env.PAYROLL_YEAR) == 'string' ? process.env.PAYROLL_YEAR : '2019';
var currentOptions = 'Guides' + currentOptYear;

// Check if the current enviromnent is one of the enviromnents above, if not, default to staging
var configToExport = typeof(options[currentOptions]) == 'object' ? options[currentOptions] : options.Guides2019;

module.exports = configToExport;

