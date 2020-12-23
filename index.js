/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesInfo) {
    return employeesInfo.map(employeeInfo => createEmployeeRecord(employeeInfo))
}

function createTimeInEvent(timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this
}

function createTimeOutEvent(timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this
}

function hoursWorkedOnDate(dateStamp) {
    let timeIn = this.timeInEvents.find(element => element.date === dateStamp)
    let timeOut = this.timeOutEvents.find(element => element.date === dateStamp)

    return (timeOut.hour - timeIn.hour)/100
} 

function wagesEarnedOnDate(dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}
    
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees) {
    return employees.reduce((memo, employee) => memo + allWagesFor.call(employee), 0)
}

function findEmployeeByFirstName(srcArray, first) {
    return srcArray.find(employee => employee.firstName === first)
}