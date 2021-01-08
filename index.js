/* Your Code Here */

const createEmployeeRecord = function(employeeArray) {

    const employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}

const createEmployeeRecords = function (employeeRowInfo) {
    return employeeRowInfo.map(function (employeeArray) {
        return createEmployeeRecord(employeeArray)
    })
}

const createTimeInEvent = function (dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1]);
    this.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: hour
    })
    return this;
}

const createTimeOutEvent = function (dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1]);
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: hour
    })
    return this;
}

const hoursWorkedOnDate = function (date) {
    let inEvent = this.timeInEvents.find(event => event.date === date);
    let outEvent = this.timeOutEvents.find(event => event.date === date);
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return wage;
}

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

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName)
}


const calculatePayroll = function (Array) {
    return Array.reduce((total, employee) => total + allWagesFor.call(employee), 0)
}