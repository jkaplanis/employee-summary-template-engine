// Require Manager, Engineer, and Intern constructors
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Require inquirer, path, and file system
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Require render function
const render = require("./lib/htmlRenderer");

// Allows for different OS path formatting
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Create array to hold employee objects
const employees = [];

// Write file function checks if the output directory
// is absent and creates it before proceeding to the
// write file step.
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

// Inquirer prompt to determine which employee should be added next.
// If the user is done, writefile is called.
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

// Inquirer prompt to add manager.
// Add team member function is called at the end.
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

// Inquirer prompt to add Engineer.
// Add team member function is called at the end.
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

// Inquirer prompt to add Intern.
// Add team member function is called at the end.
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

// Add Manger function called to start the program.
addManager();
