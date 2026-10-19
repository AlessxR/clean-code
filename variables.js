w//////////////////////////////////////////////////////////////////////////////////////////////

// Use meaningful and pronounceable variable names
// bad
var yyyymmdstr = moment().format('YYYY/MM/DD');

// good
var yearMonthDay = moment().format('YYYY/MM/DD');

//////////////////////////////////////////////////////////////////////////////////////////////

// Use ES6 constants when value do not change
// bad
var FIRST_US_PRESIDENT = 'George Washington';

// good
const FIRST_US_PRESIDENT = 'George Washington';

//////////////////////////////////////////////////////////////////////////////////////////////

// Use the same vocabulary for the same type of variable
// bad
getUserInfo();
getClientData();
getCustomerRecord();

// good
getUser();
getClient();
getCustomer();

///////////////////////////////////////////////////////////////////////////////////////////////

// Use explanatory variables
// bad
const cityStateRegex = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/;
saveCityState(
    cityStateRegex.match(cityStateRegex)[1],
    cityStateRegex.match(cityStateRegex)[2],
);

// good
const cityStateRegex1 = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/;
const match = cityStateRegex1.match(cityStateRegex1);
const city = match[1];
const state = match[2];
saveCityState(city, state);


///////////////////////////////////////////////////////////////////////////////////////////////

// Dont add needed context
// bad
var Car = {
    carMake: 'Honda',
    carModel: 'Accord',
    carColor: 'Blue',
};

function paintCar(car) {
    car.carColor = 'Red';
}

// good
var Car = {
    make: 'Honda',
    model: 'Accord',
    color: 'Blue'
}

function paintCar(car) {
    car.color = 'Red';
}

///////////////////////////////////////////////////////////////////////////////////////////////

// Use searchable name
// bad
for (var i = 0; i < 525600; i++) {
    runCrobJob();
}

// good
var MINUTES_IN_A_YEAR = 525600;
for (var i = 0; i < MINUTES_IN_A_YEAR; i++ {
    runCrobJob();
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Short-circutting is cleaner than conditionals
// bad
function createMicrobrewery(name) {
    var breweryName;

    if (name) {
        breweryName = name;
    } else {
        breweryName = 'Hipster Brew Co.';
    }
}

// good
function createMicrobrewery1(name) {
    var breweryName = name || 'Hipster Brew Co.';

    return breweryName;
} 