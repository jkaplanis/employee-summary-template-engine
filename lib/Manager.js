// Require employee constructor
const Employee = require("./Employee.js");

// Manager constructor extending Employee constructor
// to inherit properties and functions
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    let role = "Manager";
    return role;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

// Export Manager constructor
module.exports = Manager;
