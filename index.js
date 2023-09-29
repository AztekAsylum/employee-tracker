const inquirer = require("inquirer");
const util =require("util");
const db = require("./config/connection");
//query will be used to query database
// const query = util.promisify(db.query).bind(db)
async function init() {
  const answers = await inquirer.prompt([
  {
    type:"list",
    name:"userChoice",
    message:"What would you like to do?",
    choices:["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role","quit"]
  }
  ])
  switch (answers.userChoice) {
    case "view all departments": 
      viewAllDepartments()
      break;
    case "view all roles": 
      viewAllRoles()
      break;
    case "view all employees": 
      viewAllEmployees()
      break;
    case "add a department": 
      addDepartment()
      break;
    case "add a role": 
      addRole()
      break;
    case "add an employee": 
      addEmployee()
      break;
    case "update an employee role": 
      updateEmployeeRole()
      break;
    case "quit": 
      quit()
      break;
  
    default:
      console.log("log on line 42 opps");
      break;
  }
  function viewAllDepartments(params) {
    console.log("viewAllDepartments");
    
  }
  function viewAllRoles(params) {
    console.log("viewAllRoles");
    
  }
  function viewAllEmployees(params) {
    console.log("viewAllEmployees");
    
  }
  function addDepartment(params) {
    console.log("addDepartment");
    
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
