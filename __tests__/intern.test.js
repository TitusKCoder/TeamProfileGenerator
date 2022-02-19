const Intern = require("../lib/intern");

test('Create intern oject', () => {
    const intern = new Intern('Titus',1,'mail@mail.com','temple');

    expect(intern.empName).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String)); 
})

test('Get github function', () => {
    const intern = new Intern('Titus',1,'mail@mail.com','temple');

    expect(intern.getSchool()).toEqual('temple');

})

test('Get role function', () => {
    const intern = new Intern('Titus',1,'mail@mail.com','temple');

    expect(intern.getRole()).toEqual('Intern');
})