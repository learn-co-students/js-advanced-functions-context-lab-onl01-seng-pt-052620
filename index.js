/* Your Code Here */

function createEmployeeRecord(newEmployeeArray) {
  const newEmployee = {
    firstName:      newEmployeeArray[0],
    familyName:     newEmployeeArray[1],
    title:          newEmployeeArray[2],
    payPerHour:     newEmployeeArray[3],
    timeInEvents:   [],
    timeOutEvents:  []
  }
  return newEmployee;
}

function createEmployeeRecords(newEmployeeData) {
  return newEmployeeData.map( newEmployee => createEmployeeRecord(newEmployee) );
}

function createTimeInEvent(timeInString) {
  const [date, hour] = timeInString.split(' ');
  this.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  })
  return this;
}

function createTimeOutEvent(timeOutString) {
  const [date, hour] = timeOutString.split(' ');
  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  })
  return this;
}

function hoursWorkedOnDate(dateString) {
  const timeInEvent = this.timeInEvents.find(e => e.date === dateString)
  const timeOutEvent = this.timeOutEvents.find(e => e.date === dateString)
  
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(dateString) {
  return hoursWorkedOnDate.call(this, dateString) * this.payPerHour;
}

function calculatePayroll(employeeRecordsArray) {
  return employeeRecordsArray.reduce((runningTotal, employee) => {
    return runningTotal + allWagesFor.call(employee);
  }, 0)
}

function findEmployeeByFirstName(employeeRecordsArray, firstName) {
  return employeeRecordsArray.find(e => e.firstName === firstName);
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