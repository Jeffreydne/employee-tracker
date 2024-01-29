# employee-tracker
An app that allows the user to see and update employee and employment data from a locally stored database

---

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |
| JavaScript     | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |    
| Node.js | [https://nodejs.org/](https://nodejs.org/)     |
| NPM | [https://www.npmjs.com](https://www.npmjs.com)   |
| Mysql | [https://www.mysql.com/](https://www.mysql.com/)   |

---

## Badges
![Static Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Static Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Static Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
<!-- ![Static Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) -->
![Static Badge](https://img.shields.io/badge/License-MIT_License-blue)
<!-- ![Static Badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) -->

![Static Badge](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
---

## Description

[Visit the Github repository](https://github.com/Jeffreydne/employee-tracker)
[Watch the screencastify video explaining how to use the app]()

This application allows a user to interact with the Employee Database which is stored locally. The user will be able to see and update 3 tables: Departments, Roles and Employees. 

---

## Instalation

This application requires the npm modules express, inquirer and mysql2. You will need to type npm install in the command line before running this program for the 1st time. 


---

## Code Example

The three code examples below show how this CLI based website funtions:
The following mysql snippet shows the 3rd of 3 tables created in the schema.sql file. This is the employees table which has 5 columns. First, c_id, a unique id number for each employee which is an integer that is automatically added and is the primary key. Next, the first and last names which are of type VARCHAR, then 2 more integers, the role id which is required and the manager id which is needed only for those employees with managers. The role id allows this table to be joined to the role table allowing for the display of the job title and salary, and the manager id allows the manager's name to be displayed when a table of employees is requested 

```SQL
CREATE TABLE employees (
    c_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);
```
The following line of javascript uses the npm module mysql2 to sign in to the database, called employee_db, which is already existing in the computer.  
```JS
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

```
The following code shows how the npm module inquirer is used in connection with mysql2. This code shows the main prompt function which asks the user what action they want to perform when they first log in using npm start from the CLI. The prompt promise asks that question with a drop down list of 8 possible choices for the user to choose from by scrolling to that choice and hitting enter. That is followed by the .then((response) => {}) funtion which is a series of if then statements, one for each of the 8 possible answers to the question. Only the 1st 2 possibilities are shown. 

If the user chooses to quit, they simply receive the message to use control c to quit. If they choose to view all departments, the user receives the message "Here are all departments followed by a table including the departments currently in the data base. Since this is dynamic, in that users can add departments, a for loop is used to display each row of the table. And finally the function returns itself so that no matter what action the user chooses, other than asking to quit, the user will be again asked what they want to do now. 

```JS
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

```



## Usage

This website is designed to allow a user to view the departments, roles and employees of a company. They can also add Departments, Roles and Employees and will be asked by Inquirer to provide the needed information to add them. They can also change the role of an existing employee. 



---

## Learning Points

This project was built from scratch. 

* Mysql is used to create a data base and set up the required tables in the file schema.sql. Additionally these tables are populated with the initial data using the seeds.sql file. The data base is then set up on the CLI using mysql source commands after logging in.  

* The use of mysql2 is required and instantiated into the variable db. mysql2 is then called using "const db = mysql.createConnection" with the required data in the subsequent code. Mysql2 allows the user to see and/or add to the data in the prebuilt tables. 

* The use of inquirer is required and instantiated into the variable inquirer. Inquirer.prompt is then used to ask the user what they want to do. The response object is used in a series of if/then statements to carry out the users wishes. 

* Bundling the initial prompt into a function, and then calling that function after each request by the user is completed, allows the user to be able to keep using the app with out having to restart it. 

*  One key point regarding the use of mysql is that concept of storing data in as compact a way a spossible in individual tables, and then joining the tables through the use of primary keys, thus allowing data to be stored efficiantly while allowing the data to be presented in the form that is best suited for the user's use. 
   
---

## Author Info

### Jeffrey Nelson


* [Portfolio](https://jeffreydne.github.io/Jeff-Nelson-Portfolio/)
* [LinkedIn](https://www.linkedin.com/in/jeffrey-nelson13/)
* [Github](https://github.com/Jeffreydne)

---
## Credits

  This application was built from scratch. I have used many of the strategies taught by the excellent instructers at the UC Berkeley Extension Full Stack coding bootcamp. In this case I used variations of methods taugth in unit 12, which deals with mysql, and I directly copied the mysql2 starter function which starts "const db = mysql.createConnection". I alos used the same structure to use this function in teh various db.query functions later in the code. I also borrowed heavily from unit 9 where we learned to use the npm inquirer package and its prompt promise. Finally, I copied open source badges from Vedant Chainani at the website https://dev.to/envoy_/150-badges-for-github-pnk#contents 
 
---