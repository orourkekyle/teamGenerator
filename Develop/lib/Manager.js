const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Manager.
class Manager extends Employee {
    constructor(officeNum) {
        super(name, id, email);
        this.officeNum = officeNum;
    }
    getOfficeNumber() {
        return this.officeNum;
    }
    getRole() {
      return "Manager";
    }
  }
  module.exports = Manager;