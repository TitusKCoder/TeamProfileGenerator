const Employee = require("../lib/employee");

test('Creates Employee object', () => {
    const employee = new Employee('Titus', 1, 'mail@mail.com');

    expect(employee.empName).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
})

test('Get name function', () => {
    const employee = new Employee('Titus', 1, 'mail@mail.com');

    expect(employee.getName()).toEqual('Titus');
})

test('Get ID Function', () => {
    const employee = new Employee('Titus', 1, 'mail@mail.com');

    expect(employee.getId()).toEqual(1);
})

test('Get Email fuction', () => {
    const employee = new Employee('Titus', 1, 'mail@mail.com');

    expect(employee.getEmail()).toEqual('mail@mail.com');
})

test('Get Role function', () => {
    const employee = new Employee('Titus', 1, 'mail@mail.com');

    expect(employee.getRole()).toEqual('Employee');
})