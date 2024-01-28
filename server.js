const express = require('express');
// Import and require inquirer
const inquirer = require('inquirer');

// const { handleMainPrompt } = require('./actions/actions.js')
// XXXXXXXX LIKELY TO DELETE THESE XXXXXXX
// const {writeFile} = require('fs/promises');
// const mysql = require('mysql2');
// 
const {writeFile} = require('fs/promises');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// call mysql to connect to employee_db 
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  //Welcome message:
  console.log(`***** EMPLOYEE TRACKER *****\n`);
// function to handle main prompt. To be called when ever user starts app or after choosing an option that does not require further prompts
// const handleMainPrompt = (response) => {
//     const db = mysql.createConnection(
//         {
//           host: 'localhost',
//           user: 'root',
//           password: 'password',
//           database: 'employee_db'
//         },
//         console.log(`Connected to the employee_db database.`)
//       );
//     switch(response.actionFromMain) {
//         case "View all employees":
//             console.log(`Select your next option to ${response.actionFromMain}:\n `);
  
//             break;
//         case "Add employee":
//             console.log(`Select your next option to ${response.actionFromMain}:\n `);
//             break;
//         case "Update employee role":
//            console.log(`Select your next option to ${response.actionFromMain}:\n `);
//             break;
//         case "View all roles":
//             console.log(`Select your next option to ${response.actionFromMain}:\n `);
//             break;
//         case "Add a role":
//             console.log(`Select your next option to ${response.actionFromMain}:\n `);
//             break;
//         case "View all departments":
//             console.log(`Here are all Departments:\n `);
//             db.query('SELECT * FROM departments', function (err, results) {
//                 console.log(`id   Department Name\n${results[0].id}   ${results[0].department_name}\n${results[1].id}   ${results[1].department_name}\n${results[2].id}   ${results[2].department_name}\n${results[3].id}   ${results[3].department_name}`);
//               });
//               return mainPrompt();
//             break;
//         case "Add department":
//             console.log(`Select your next option to ${response.actionFromMain}:\n `);
//             break;
//         case "Quit":
//             console.log(`The application will ${response.actionFromMain} now. Restart with npm start on command line any time you want to return.\n `);
//             break;
//         default:
//             console.log("You didn't pick an action.");
//             break;
//     }
// }
function mainPrompt () {
    return inquirer
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
        if(response.actionFromMain === "Quit") {
            console.log(`To ${response.actionFromMain} the application, hit "control c".\n Thanks for using employee tracker!`);
        } else if (response.actionFromMain === "View all departments") {
            console.log(`\nHere are all Departments:\nid   Department Name\n**************************\n`);
            db.query('SELECT * FROM departments', function (err, results) {
                for(let i = 0; i < results.length; i++) {
                    console.log(`${results[i].id}   ${results[i].department_name}\n`);
                }
            console.log(`**************************\n`);
            return mainPrompt();
        });
        } else if (response.actionFromMain === "View all roles") {
            console.log(`\nHere are all the Roles:\n `);
            db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
            console.log(`Role_id   Title          Salary   Department\n*********************************************\n${results[2].r_id}   ${results[2].title}   ${results[2].salary}   ${results[2].department_name}\n${results[3].r_id}   ${results[3].title}   ${results[3].salary}   ${results[3].department_name}\n${results[4].r_id}   ${results[4].title}   ${results[4].salary}   ${results[4].department_name}\n${results[5].r_id}   ${results[5].title}    ${results[5].salary}   ${results[5].department_name}\n${results[6].r_id}   ${results[6].title}   ${results[6].salary}   ${results[6].department_name}\n${results[7].r_id}   ${results[7].title}    ${results[7].salary}   ${results[7].department_name}\n${results[0].r_id}   ${results[0].title}    ${results[0].salary}   ${results[0].department_name}\n${results[1].r_id}   ${results[1].title}    ${results[1].salary}   ${results[1].department_name}\n*********************************************\n`);
            return mainPrompt();
        });
        } else if (response.actionFromMain === "View all employees") {

            console.log(`\nHere are all Employees:\n `);
            db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.r_id JOIN departments ON roles.department_id = departments.id', function (err, results) {
                console.log(`c_id 1st_Name   Last_Name     Title   Department  Salary      Manager\n***********************************************************************\n`);
                for(let i = 0; i < results.length; i++) {
                    let managerName;
                    if(results[i].manager_id === 1 ) {
                        managerName = 'Hodges';
                    } else if(results[i].manager_id === 3 ) {
                        managerName = "Nguyen";
                    } else if(results[i].manager_id === 5 ) {
                        managerName = "Jackson";
                    } else if(results[i].manager_id === 7 ) {
                        managerName = "Peters"
                    } else {
                        managerName = null;
                    }
                    console.log(`${results[i].c_id}   ${results[i].first_name}        ${results[i].last_name}     ${results[i].title}   ${results[i].department_name}  ${results[i].salary}  ${managerName}\n`);
                }
            console.log('***********************************************************************');
            return mainPrompt();
        });
        } else if (response.actionFromMain === "Add department") {
            addDeptPrompt();
        //     console.log(`\nHere are all Departments:\n`);
        //     db.query('SELECT * FROM departments', function (err, results) {
        //     console.log(`id   Department Name\n**************************\n${results[0].id}   ${results[0].department_name}\n${results[1].id}   ${results[1].department_name}\n${results[2].id}   ${results[2].department_name}\n${results[3].id}   ${results[3].department_name}\n**************************\n`);
        //     return mainPrompt();
        // });
        } else {
            // handleMainPrompt(response);
            return mainPrompt();
        }
    });
}
mainPrompt()
.then(console.log('THIS WILL BE REMOVED'))
.catch((error) => {});
// Initial console log and prompts on start
// console.log(`***** EMPLOYEE TRACKER *****\n`);
// inquirer
// .prompt([
//     {
//         type: 'list',
//         message: 'What would you like to do ? ',
//         choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add a role', 'View all departments', 'Add department', 'Quit'],
//         name:'actionFromMain',
//     }
// ])
// //switch statement to direct next action based on users choice
// .then((response) => {
//     handleMainPrompt(response)
// });
// Default response for any request from browser (Not Found) since this app is from CLI
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });