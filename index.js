// Your code here

function createEmployeeRecord(employee) {
    return {
        'firstName': employee[0],
        'familyName': employee[1],
        'title': employee[2],
        'payPerHour': employee[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(employeesArray) {
    const employeeObjects = [];
    employeesArray.map(employee => employeeObjects.push(createEmployeeRecord(employee)));
    return employeeObjects;
}

function createTimeInEvent(employeeObject, date) {
    employeeObject.timeInEvents.push({
        'type': 'TimeIn',
        'hour': parseInt(date.slice(11, 15)),
        'date': date.slice(0,10)
    });
    return employeeObject;
}

function createTimeOutEvent(employeeObject, date) {
    employeeObject.timeOutEvents.push({
        'type': 'TimeOut',
        'hour': parseInt(date.slice(11, 15)),
        'date': date.slice(0, 10)
    });
    return employeeObject;
}

function hoursWorkedOnDate(employeeObject, date) {
    return (employeeObject.timeOutEvents.filter(event => event.date === date)[0].hour - employeeObject.timeInEvents.filter(event => event.date === date)[0].hour) / 100;
}

function wagesEarnedOnDate(employeeObject, date) {
    return employeeObject.payPerHour * hoursWorkedOnDate(employeeObject, date);
}

function allWagesFor(employeeObject) {
    const workedDates = [];
    let allWages = 0;
    employeeObject.timeInEvents.map(element => workedDates.push(element.date));
    workedDates.map(element => allWages += wagesEarnedOnDate(employeeObject, element));
    return allWages;
}

function calculatePayroll(employeesArray) {
    let payrollSum = 0;
    employeesArray.map(employee => payrollSum += allWagesFor(employee));
    return payrollSum;
}