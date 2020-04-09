// Require employee constructor
const Employee = require("./Employee.js");

// Intern constructor extending Employee constructor
// to inherit properties and functions
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    let role = "Intern";
    return role;
  }
}

// Export Intern constructor
module.exports = Intern;
