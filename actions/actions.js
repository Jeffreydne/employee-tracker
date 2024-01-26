const {writeFile} = require('fs/promises');
const mysql = require('mysql2');

// function to handle main prompt. To be called when ever user starts app or after choosing an option that does not require further prompts
const handleMainPrompt = (response) => {
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
        case "View all roles":
            console.log(`Select your next option to ${response.actionFromMain}:\n `)
            break;
        case "Add a role":
            console.log(`Select your next option to ${response.actionFromMain}:\n `)
            break;
        case "View all departments":
            console.log(`Select your next option to ${response.actionFromMain}:\n `)
            break;
        case "Add department":
            console.log(`Select your next option to ${response.actionFromMain}:\n `)
            break;
        case "Quit":
            console.log(`The application will ${response.actionFromMain}now. Restart with npm start on command line any time you want to return.\n `)
            break;
        default:
            console.log("You didn't pick an action.");
            break;
    }
}

module.exports = { handleMainPrompt };