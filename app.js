const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

writeFile = html => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, html, err => {
    if (err) {
      console.log(err);
    }
    console.log(`Success! File location: ${outputPath}`);
  });
};
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const addTeamMember = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "employeeType",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ])
    .then(ans => {
      if (ans.employeeType === "Engineer") {
        addEngineer();
      } else if (ans.employeeType === "Intern") {
        addIntern();
      } else if (
        ans.employeeType === "I don't want to add any more team members"
      ) {
        const html = render(employees);
        writeFile(html);
      }
    });
};
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const addManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your manager's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your manager's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your manager's email?"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?"
      }
    ])
    .then(ans => {
      const manager = new Manager(
        ans.name,
        ans.id,
        ans.email,
        ans.officeNumber
      );
      employees.push(manager);
      addTeamMember();
    });
};

const addEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your engineer's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your engineer's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email?"
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub username?"
      }
    ])
    .then(ans => {
      const engineer = new Engineer(ans.name, ans.id, ans.email, ans.github);
      employees.push(engineer);
      addTeamMember();
    });
};

const addIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your intern's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your intern's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?"
      },
      {
        type: "input",
        name: "school",
        message: "What is your intern's school?"
      }
    ])
    .then(ans => {
      const intern = new Intern(ans.name, ans.id, ans.email, ans.school);
      employees.push(intern);
      addTeamMember();
    });
};
addManager();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```