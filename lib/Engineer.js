// Require employee constructor
const Employee = require("./Employee.js");

// Engineer constructor extending Employee constructor
// to inherit properties and functions
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    let role = "Engineer";
    return role;
  }
}

// Export Engineer constructor
module.exports = Engineer;
