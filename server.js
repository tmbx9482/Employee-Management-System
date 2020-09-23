// Require mysql
const mysql = require("mysql");
// Require console table
const consoleTable = require('console.table');
// Require inquirer
const inquirer = require('inquirer');
// Require Cfonts
const CFonts = require('cfonts');
const { asyncScheduler } = require("rxjs");


// Welcome Menu
// https://www.npmjs.com/package/cfonts for logo and ref
console.log(
    CFonts.say('Employee|Management|System!', {
        font: 'chrome',             // define the font face
        align: 'center',            // define text alignment
        colors: ['#f80'],          // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
        gradient: true,             // define your two gradient colors
        independentGradient: false, // define if you want to recalculate the gradient for each new line
        transitionGradient: false,  // define if this is a transition between colors directly
        env: 'node'                 // define the environment CFonts is being executed in
    })
);

// Create a connection to MySQL
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeetracker_db'
});

//Connection found
connection.connect(function (err) {
    if (err) throw err;
    console.log("Complete connected as id " + connection.threadId);
    startingPoint();
});


// Questions for command prompt to get started with our managment system
// Building a command-line application to add the following:
async function startingPoint() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to create in your Management system?",
            name: "selectPrompt",
            choices: [
                "Add departments",
                "Add roles",
                "Add employees",
                "View departments",
                "View roles",
                "View employees",
                "Update employee roles",
                "Main Menu"]
        }

    ]).then(response => {
        console.log('response: ', response);
        //Switch & Break cases
        switch (response.selectPrompt) {
            // The value of the expression is compared with the values of each case.
            //Adding departments
            case "Add departments":
                addDepartments();
                break;
            //Adding roles
            case "Add roles":
                addRoles();
                break;
            //Adding employees
            case "Add employees":
                addEmployees();
                break;
            //Viewing departments
            case "View departments":
                viewDepartments();
                break;
            //Viewing roles
            case "View roles":
                viewRoles();
                break;
            //Viewing employees
            case "View employees":
                viewEmployees();
                break;
            //Update employee roles
            case "Update employee roles":
                updateEmployeeRoles();
                break;
            // Start all over
            case "Main Menu":
                connection.end();
                break;
        }
    });
}
// Adding Department questions to node
// Using data from mySQL
let addDepartments = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "addDept",
                message: "What department would you like to start in the company?",
            },
        ])
        .then(function (response) {
            const queryString = "INSERT INTO department SET ?";
            connection.query(queryString, { dept_name: response.addDept }, function (
                err
            ) {
                if (err) {
                    throw err;
                }
                console.log("Department has been promoted successfully");
                startingPoint();
            });
        });
}

// Adding Role questions to node
// Using data from mySQL
let addRoles = () => {
    let department = [];
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) {
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            department.push({ name: res[i].dept_name, value: res[i].id });
        }
    });
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What's the title for this role?",

            },
            {
                type: "number",
                name: "moneyMaker",
                message: "What is the yearly salary for the givin role?",

            },
            {
                type: "list",
                name: "careerPath",
                message: "Which department does this role best fit?",
                choices: ["Marketing", "Engineering", "Human Resource", "IT", "Data Science"]
            },
        ])
        //CRUD oporations for questions in node
        .then(function (response) {
            const queryString = "INSERT INTO role SET ?";
            connection.query(
                queryString,
                {
                    title: response.roleTitle,
                    salary: response.moneyMaker,
                    department_id: response.careerPath,
                },
                function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log("Role has been added successfully");
                    startingPoint();
                }
            );
        });
}

// Adding Employee questions to node
// Using data from mySQL
let addEmployees = () => {
    let role = [];
    connection.query("INSERT VALUES * FROM role", function (err, res) {   // Look this up
        if (err) {
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            role.push({ name: res[i].title, value: res[i].id });
        }
    });
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "If you're an employee, what is your first name and if not, Who am I talking too?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is your last name for our records database?",
            },
            {
                type: "list",
                name: "roleId",
                message: "What's the employee's given role?",
                choices: role,
            },
            {
                type: "input",
                name: "managerId",
                message: "If the employee has a manager, what is the manager's ID number?"
            },
        ])
        .then(function (response) {
            const queryString = "INSERT INTO employee SET ?";
            connection.query(
                queryString,
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.roleId,
                    manager_id: response.managerId,
                },
                function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log("Employee has been added to a Department");
                    startingPoint();
                }
            );
        });
}

// Still need more information for 100% done