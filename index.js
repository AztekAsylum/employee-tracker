const inquirer = require("inquirer");
const util = require("util");
const db = require("./db/index");
//query will be used to query database
// const query = util.promisify(db.query).bind(db)
async function init() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "quit",
      ],
    },
  ]);
  switch (answers.userChoice) {
    case "view all departments":
      viewAllDepartments();
      break;
    case "view all roles":
      viewAllRoles();
      break;
    case "view all employees":
      viewAllEmployees();
      break;
    case "add a department":
      addDepartment();
      break;
    case "add a role":
      addRole();
      break;
    case "add an employee":
      addEmployee();
      break;
    case "update an employee role":
      updateEmployeeRole();
      break;
    case "quit":
      quit();
      break;

    default:
      console.log("log on line 42 opps");
      break;
  }
  async function viewAllDepartments() {
    const departmentData = await db.findAllDepartments();
    console.table(departmentData[0]);
  }
  async function viewAllRoles() {
    const roleInfo = await db.findAllRoles();
    console.table(roleInfo[0]);
  }
  async function viewAllEmployees() {
    const employeeInfo = await db.findAllEmployees();
    console.table(employeeInfo[0]);
  }
  async function addDepartment() {
    const department = await inquirer.prompt([{
      type: "input",
      name: "name",
      message: "Enter name of the new department"
    }])

    const newDepartment = await db.createDepartment(department.name);
    console.log(`Created ${department.name} department`);
    const departmentData = await db.findAllDepartments();
    console.table(departmentData[0]);
  }
  function addRole(params) {
    console.log("addRole");
  }
  function addEmployee(params) {
    console.log("addEmployee");
  }
  function updateEmployeeRole(params) {
    console.log("updateEmployeeRole");
  }
  function quit(params) {
    console.log("quit");
  }
  //add switch statment or if statement that runs a function based of user choice

  // const answers = await query("SELECT * FROM department")
  // console.table(demo);
}

init();
