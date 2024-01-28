const express = require('express');
// Import and require both inquirer and mysql2
const inquirer = require('inquirer');
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

// function to handle main prompt. To be called when ever user starts app or after completing any option
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
    //if/then statements to direct next action based on users choice
    .then((response) => {
        // if user wishes to quit, directs them to use "control c"
        if(response.actionFromMain === "Quit") {
            console.log(`To ${response.actionFromMain} the application, hit "control c".\n Thanks for using employee tracker!`);
            //View all Departments request uses a for loop to display results in a table of all departments using variables obtained from mysql2 for 'select * from departments' table command
        } else if (response.actionFromMain === "View all departments") {
            console.log(`\nHere are all Departments:\nid   Department Name\n**************************\n`);
            db.query('SELECT * FROM departments', function (err, results) {
                for(let i = 0; i < results.length; i++) {
                    console.log(`${results[i].id}   ${results[i].department_name}\n`);
                }
                console.log(`**************************\n`);
                return mainPrompt();
            });
            //View all roles request uses a for loop to display results in a table of all roles using variables obtained from mysql2 for 'select * from roles' table and 'JOIN departments' table commands
        } else if (response.actionFromMain === "View all roles") {
            console.log(`\nHere are all the Roles:\nRole_id   Title          Salary   Department\n*********************************************\n`);
            db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
                for(let i = 0; i < results.length; i++) {
                    console.log(`\n${results[i].r_id}   ${results[i].title}   ${results[i].salary}   ${results[i].department_name}`);
                }
                console.log(`\n*********************************************\n`);
                return mainPrompt();
            });
            //View all employees request uses a for loop to display results in a table of all employees using variables obtained from mysql2 for 'select * from employees' table and 'JOIN departments' table and 'JOIN roles' table commands
        } else if (response.actionFromMain === "View all employees") {
            console.log(`\nHere are all Employees:\n `);
            db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.r_id JOIN departments ON roles.department_id = departments.id', function (err, results) {
                console.log(`c_id 1st_Name   Last_Name     Title   Department  Salary      Manager\n***********************************************************************\n`);
                for(let i = 0; i < results.length; i++) {
                    let managerName;
                    if(results[i].manager_id === 1 ) {
                        managerName = 'Cane';
                    } else if(results[i].manager_id === 3 ) {
                        managerName = "Nguyen";
                    } else if(results[i].manager_id === 5 ) {
                        managerName = "Henson";
                    } else if(results[i].manager_id === 7 ) {
                        managerName = "Stevens";
                    } else {
                        managerName = null;
                    }
                    console.log(`${results[i].c_id}   ${results[i].first_name}        ${results[i].last_name}     ${results[i].title}   ${results[i].department_name}  ${results[i].salary}  ${managerName}\n`);
                }
                console.log('***********************************************************************');
                return mainPrompt();
            });
             //Add department request uses inquirer to capture new department name in a variable then using mysql2 for 'INSERT INTO departments' adds the variable input by user into 'departments' table
        } else if (response.actionFromMain === "Add department") {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the new Department?',
                    name:'newDeptName',
                },
            ])
            .then((response) => {
                db.query(`INSERT INTO departments (department_name) VALUES ("${response.newDeptName}")`, function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newDeptName} added successfully to departments`);
                    }
                return mainPrompt();
                })
            }); 
            //Add a role request uses inquirer to capture new role name, salary, and department id in variables then using mysql2 for 'INSERT INTO roles' adds the variables input by user into 'roles' table
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
            .then((response) => {
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${response.newRoleName}", "${response.newRoleSalary}", "${response.newDeptID}")`, function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newRoleName} added successfully to roles`);
                    }
                return mainPrompt();
                })
            }); 
            //Add employee request uses inquirer to capture new employee's first & last names, and the ids of tehir new role and manager, into variables, then using mysql2 for 'INSERT INTO employees' adds the variables input by user into 'employees' table
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
                },                          
            ])
            .then((response) => {
                db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${response.newFirstName}", "${response.newLastName}", "${response.newRoleID}", "${response.newManagerID}")`, function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newFirstName} ${response.newLastName} added successfully to employees`);
                    }
                return mainPrompt();
                })
            }); 
            //Update employee role request uses inquirer to capture which employee to change (by id), and their new role and manager (also by id), in variables, then using mysql2 for 'UPDATE employees' table adds the variables input by user with SET command into correct employee by usoing 'WHERE c_id=' command to reflect input of user
        } else if (response.actionFromMain === "Update employee role") {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the id of the employee switching roles (the c_id on employee table)?',
                    name:'empID',
                },
                {
                    type: 'input',
                    message: 'What is the new role id of the new role (r_id on roles table)?',
                    name:'newRoleID',
                },
                {
                    type: 'input',
                    message: 'What is the new manager_id number of the new role(enter the number 0 if there is no manager)?',
                    name:'newManagerID',
                } 
            ])
            .then((response) => {
                db.query(`UPDATE employees SET manager_id=${response.newManagerID}, role_id=${response.newRoleID} WHERE c_id=${response.empID}`, function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`The employee's role_id & manager_id were successfully changed`);
                    }
                return mainPrompt();
                })
            }); 
            // It should not be possible to get any other phrases input in teh 'response.actionFromMain' variable, but if there is something else something went wrong and that will be sent to user
        } else {
            console.log('something must have gone wrong');
        }
    });
}
mainPrompt()
.then(console.log('Press return or enter when the item highlighted is your choice'))
.catch((error) => {});

// Default response for any request from browser (Not Found) since this app is from CLI
app.use((req, res) => {
    res.status(404).end();
  });
  
  // port listener
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });