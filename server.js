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
            console.log(`\nHere are all the Roles:\nRole_id   Title          Salary   Department\n*********************************************\n`);
            db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
                for(let i = 0; i < results.length; i++) {
                    console.log(`\n${results[i].r_id}   ${results[i].title}   ${results[i].salary}   ${results[i].department_name}`);
                }
                console.log(`\n*********************************************\n`);
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
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the new Department?',
                    name:'newDeptName',
                },
            ])
            //switch statement to direct next action based on users choice
            .then((response) => {
                console.log(response);
                db.query(`INSERT INTO departments (department_name) VALUES ("${response.newDeptName}")`, function (err, results) {
                    // `${response.newDeptName} add to list of departments.\n`
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newDeptName} added successfully to departments`);
                    }
                // console.log(results);
                return mainPrompt();
                })
            }); 
        } else if (response.actionFromMain === "Add a role") {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the new Role?',
                    name:'newRoleName',
                },
                {
                    type: 'input',
                    message: 'What is the salary for the new Role?',
                    name:'newRoleSalary',
                },
                {
                    type: 'input',
                    message: 'What is the department_id of the new Role?',
                    name:'newDeptID',
                }
            ])
            //switch statement to direct next action based on users choice
            .then((response) => {
                console.log(response);
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${response.newRoleName}", "${response.newRoleSalary}", "${response.newDeptID}")`, function (err, results) {
                    // `${response.newDeptName} add to list of departments.\n`
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newRoleName} added successfully to roles`);
                    }
                // console.log(results);
                return mainPrompt();
                })
            }); 
        } else if (response.actionFromMain === "Add employee") {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                    name:'newFirstName',
                },
                {
                    type: 'input',
                    message: 'What is the last name of the new employee?',
                    name:'newLastName',
                },
                {
                    type: 'input',
                    message: 'What is the id number of the role for the new employee?',
                    name:'newRoleID',
                },
                {
                    type: 'input',
                    message: 'What is the id number of the manager for the new employee? (Enter the number 0 if there is no manager)',
                    name:'newManagerID',
                }
            ])
            //switch statement to direct next action based on users choice
            .then((response) => {
                console.log(response);
                db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${response.newFirstName}", "${response.newLastName}", "${response.newRoleID}", "${response.newManagerID}")`, function (err, results) {
                    // `${response.newDeptName} add to list of departments.\n`
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newFirstName} ${response.newLastName} added successfully to employees`);
                    }
                // console.log(results);
                return mainPrompt();
                })
            }); 
        } else {
            console.log('something must have gone wrong');
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