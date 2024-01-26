const express = require('express');
// Import and require inquirer
const inquirer = require('inquirer');


// XXXXXXXX LIKELY TO MOVE THESE XXXXXXX
const {writeFile} = require('fs/promises');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initial console log and prompts on start
console.log(`***** EMPLOYEE TRACKER *****\n`);
inquirer
.prompt([
    {
        type: 'list',
        message: 'What would you like to do ? ',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add a role', 'View all departments', 'Add department', 'Quit'],
        name:'actionFromMain',
    }
])
//switch statement to direct next action based on users choice
.then((response) => {
    switch(response.actionFromMain) {
        case "View all employees":
            console.log(`Select your next option to ${response.actionFromMain}:\n `)
            // let triangleToRender = new Triangle(response.logoColorChosen, response.textChosen, response.textColorChosen);
            // return writeFile(`./examples/${response.shapeChosen}Logo.svg`, triangleToRender.render());
            break;
        case "Add employee":
            console.log(`Select your next option to ${response.actionFromMain}:\n `)
            break;
        case "Update employee role":
           console.log(`Select your next option to ${response.actionFromMain}:\n `)
            break;
        default:
            console.log("You didn't pick an action.");
            break;
    }
});
// Default response for any request from browser (Not Found) since this app is from CLI
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });