// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Engineer.
class Engineer {
    
    constructor(officeNumber) {
        this.officeNumber = officeNumber
    }
    getOfficeNum() {
        return this.officeNumber;
    }
  
    getRole() {
      return "Engineer";
    }
  
  }
  
  module.exports = Engineer;