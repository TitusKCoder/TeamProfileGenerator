const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');
const Employee = require('./lib/employee');

const roster = [];

const employeeQuestions = [
    {
        type: 'input',
        message: 'What is the employee name?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is their ID number?',
        name: 'id'
    },
    {
        type: 'input',
        message:'What is their email?',
        name: 'email'
    },
    {
        type: 'list',
        message: 'What is their employee role?',
        name: 'role',
        choices: [
            {name: 'Manager'},
            {name: 'Engineer'},
            {name: 'Intern'},
            {name: 'Regular employee (No special role)'}
        ]
    }
]

const managerQuestions = [
    {
        type: 'input',
        message: 'What is their office number?',
        name: 'officeNum'
    }
]

const engineerQuestions = [
    {
        type: 'input',
        messsage: 'What is their Github username?',
        name: 'github'
    }
]

const internQuestions = [
    {
        type: 'input',
        message: 'What school did they go to?',
        name: 'school'
    }
]

const continueQuestion = [
    {
    type: 'list',
    message:'Would you like to add another employee?',
    name: 'continue',
    choices: [
        {name: 'Yes'},
        {name: 'No'}
    ]
}
]

// functions for building team using node and inquirer
roleCheck = async (employee) => {
    if(employee.role === 'Manager'){
        const managerResponse = await inquirer.prompt(managerQuestions)
        const manager = new Manager(employee.name, employee.id, employee.email, managerResponse.officeNum);
        return manager
    }
    else if(employee.role === 'Engineer'){
        const engineerResponse = await inquirer.prompt(engineerQuestions);
        const engineer = new Engineer(employee.name, employee.id, employee.email, engineerResponse.github);
        return engineer
    }
    else if(employee.role === 'Intern'){
        const internResponse = await inquirer.prompt(internQuestions);
        const intern = new Intern(employee.name, employee.id, employee.email, internResponse.school);
        return intern
    }
    else {
        const regEmployee = new Employee(employee.name, employee.id, employee.email);
        return regEmployee
    }
}

async function createEmployee(){
    const response = await inquirer.prompt(employeeQuestions)
    // console.log(response);
    return response
    }

async function teamBuilder(){
        try{
             const response = await createEmployee();
            console.log('General employee info gathered/ asking role');
            const createEmployeeResponse = await roleCheck(response);
            console.log(createEmployeeResponse);
             console.log('confrimed role and asked role specific questions');
            const response2 = await addtoHtml(createEmployeeResponse);
            // writetoFile(response2);
            // console.log(response2);
            console.log('Added employee to roster')
            const continuecheck = await inquirer.prompt(continueQuestion)
            if(continuecheck.continue === 'Yes'){
                roster.push(response2);
                // console.log(roster);
                teamBuilder();
            }
            else{
                roster.push(response2);
                // console.log(roster)
                writetoFile(roster);
                closeHtml();}
        }
        catch(err){ console.log(err)}
}


// Functions for creating and writiing to output HTML File 
writetoFile = (rosterList) => {
    for(i = 0; i < rosterList.length; i++){
    let data = rosterList[i]
    fs.appendFile("./dist/team.html", data, function (err) {
        if (err) {
            return reject(err);
        };
        return console.log('');
    });
}
console.log('Complete')
}
createHtml = () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dist/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

addtoHtml = (person) =>{
        if(person.constructor.name === 'Manager'){
            const name = person.getName();
            const id = person.getId();
            const email = person.getEmail();
            const officeNum = person.getOfficeNum();
            const data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item" > <a href="mailto:${email}" src="mailto:${email}">Email Address: ${email}</a></li>
                <li class="list-group-item">Office Number: ${officeNum}</li>
            </ul>
            </div>
        </div>`;
        return data

        }
        else if (person.constructor.name === 'Engineer'){
            const name = person.getName();
            const id = person.getId();
            const email = person.getEmail();
            const gitHub = person.getGitHub();
            const data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item"><a href="mailto:${email}" src="mailto:${email}">Email Address: ${email}</a></li>
                <li class="list-group-item"><a href="https://github.com/${gitHub}" target="blank" src="https://github.com/${gitHub}"> GitHub: ${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        return data

        }
        else if(person.constructor.name === 'Intern'){
            const name = person.getName();
            const id = person.getId();
            const email = person.getEmail();
            const school = person.getSchool();
            const data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item"><a href="mailto:${email}" src="mailto:${email}">Email Address: ${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        return data

        }
        else {
            const name = person.getName();
            const id = person.getId();
            const email = person.getEmail();
            let data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Employee(No special title)</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item"><a href="mailto:${email}" src="mailto:${email}">Email Address: ${email}</a></li>
            </ul>
            </div>
        </div>`;
        return data
        }
    }

closeHtml = () => {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

createHtml();
teamBuilder();