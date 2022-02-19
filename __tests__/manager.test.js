const Manager = require("../lib/manager");

test('Create manager oject', () => {
    const manager = new Manager('Titus',1,'mail@mail.com',101);

    expect(manager.empName).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(Number)); 
})

test('Get office number function', () => {
    const manager = new Manager('Titus',1,'mail@mail.com',101);

    expect(manager.getOfficeNum()).toEqual(101);

})

test('Get role function', () => {
    const manager = new Manager('Titus',1,'mail@mail.com',101);

    expect(manager.getRole()).toEqual('Manager');
})