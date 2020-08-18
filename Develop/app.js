// const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const validator = require("email-validator");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputFile = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function askQuestions() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["Manager", "Engineer", "Intern"],
            message: "What is your role in the company?",
            name: "role",
        },
        {
            type: "input",
            message: "What is your full name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your ID number?",
            name: "id",
        }
    ]).then(function (response) {
        this.name = response.name;
        this.id = response.id;
        this.role = response.role;

        function checkEmail() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your email address?",
                    name: "email"
                }
            ]).then(function(response){
                if (validator.validate(response.email)) {
                    this.email = response.email;    
                    if (this.role === "Manager") {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "What is your office number?",
                                name: "officeNumber"
                            }
                        ]).then(function (response) {
                            this.officeNumber = response.officeNumber;
                            team.push(new Manager(this.name, this.id, this.email, this.officeNumber));
                            console.log(new Manager(this.name, this.id, this.email, this.officeNumber));
                            return addMore();
                        })
                    } else if (this.role === "Engineer") {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "What is your GitHub?",
                                name: "github"
                            }
                        ]).then(function (response) {
                            this.github = response.github;
                            team.push(new Engineer(this.name, this.id, this.email, this.github));
                            console.log(new Engineer(this.name, this.id, this.email, this.github));
                            return addMore();
                        })
                    } else if (this.role === "Intern") {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "What is the name of your school?",
                                name: "school"
                            }
                        ]).then(function (response) {
                            this.school = response.school;
                            team.push(new Intern(this.name, this.id, this.email, this.school));
                            console.log(new Intern(this.name, this.id, this.email, this.school));
                            return addMore();
                        })
                    };
                    // render(team);
                } else {
                    console.log("Please enter a valid email address.");
                    checkEmail();
                };
            })
            // askQuestions();        
        }
        checkEmail();
    })
}
askQuestions();

function addMore() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["Yes", "No"],
            name: "newMember"
        }
    ]).then(function (response) {
        this.response = response.newMember
        if (this.response === "Yes") {
            return askQuestions();
        } else {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFile(outputFile, render(team), "utf8", function (error) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Success!");
            });
            return console.log("HTLM has created succesfully!!");
        }
    });
}