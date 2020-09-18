
// require mysql
const mysql = require("mysql");
//require console table
const consoleTable = require('console.table');
//require inquirer
const inquirer = require('inquirer');
//require Cfonts
const CFonts = require('cfonts');


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
const connection = mysql.Connection({
    //host
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    //Username
    user: "root",

    //Add the password
    //Use your password to connect
    password: "********",
    database: "employeetracker_db"
});

