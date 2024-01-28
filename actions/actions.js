// const {writeFile} = require('fs/promises');
// const mysql = require('mysql2');

// // call mysql to connect to employee_db 
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       user: 'root',
//       password: 'password',
//       database: 'employee_db'
//     },
//     console.log(`Connected to the employee_db database.`)
//   );
// // function to handle main prompt. To be called when ever user starts app or after choosing an option that does not require further prompts
// const handleMainPrompt = (response) => {
//     // const db = mysql.createConnection(
//     //     {
//     //       host: 'localhost',
//     //       user: 'root',
//     //       password: 'password',
//     //       database: 'employee_db'
//     //     },
//     //     console.log(`Connected to the employee_db database.`)
//     //   );
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
//             break;
//         case "Add department":
//             console.log(`Select your next option to ${response.actionFromMain}:\n `);
//             break;
//         case "Quit":
//             console.log(`The application will ${response.actionFromMain}now. Restart with npm start on command line any time you want to return.\n `);
//             break;
//         default:
//             console.log("You didn't pick an action.");
//             break;
//     }
// }

// module.exports = { handleMainPrompt };