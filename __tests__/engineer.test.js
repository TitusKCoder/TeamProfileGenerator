const Engineer = require("../lib/engineer");

test('Create engineer oject', () => {
    const engineer = new Engineer('Titus',1,'mail@mail.com','tituskcoder');

    expect(engineer.empName).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.gitHub).toEqual(expect.any(String)); 
})

test('Get github function', () => {
    const engineer = new Engineer('Titus',1,'mail@mail.com','tituskcoder');

    expect(engineer.getGitHub()).toEqual('tituskcoder');

})

test('Get role function', () => {
    const engineer = new Engineer('Titus',1,'mail@mail.com',101);

    expect(engineer.getRole()).toEqual('Engineer');
})