/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array; 
    const timeInEvents = [];
    const timeOutEvents = [];
    const employee = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    }
    return employee;
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => {
        return createEmployeeRecord(array);
    })
}

function createTimeInEvent(dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const record = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(record);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const record = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(record);
    return this;
}

function hoursWorkedOnDate(date) {
    function isDate(element) {
        return (element.date === date);
    };
    const timeIn = this.timeInEvents.find(isDate);
    const timeOut = this.timeOutEvents.find(isDate);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wage = this.payPerHour;
    return hoursWorked * wage;
}

function findEmployeeByFirstName(array, firstName) {
    const employee = array.find(employee => employee.firstName === firstName);
    return employee;
}

function calculatePayroll(array) {
    const payroll = array.map(employee => allWagesFor.call(employee));
    const payrollTotal = payroll.reduce((accum, current) => accum + current);
    return payrollTotal;
}   