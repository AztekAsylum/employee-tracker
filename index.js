const inquirer = require("inquirer");
const util = require("util");
const db = require("./db/index");
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
      console.log("opps");
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
    const department = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter name of the new department",
      },
    ]);

    const newDepartment = await db.createDepartment(department.name);
    console.log(`Created ${department.name} department`);
    const departmentData = await db.findAllDepartments();
    console.table(departmentData[0]);
  }
  async function addRole() {
    const role = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of new role",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the new role",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department id of the new role",
      },
    ]);
    const newRole = await db.createRole(
      role.title,
      role.salary,
      role.department_id
    );

    console.log("addRole");
    const roleData = await db.findAllRoles();
    console.table(roleData[0]);
  }
  async function addEmployee() {
  const employee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the employee",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the employee",
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the role id of the employee",
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the manager id of the employee",
    }

  ])
  const newEmployee = await db.createEmployee(
    employee.first_name,
    employee.last_name,
    employee.role_id,
    employee.manager_id
  )
  const employeeData = await db.findAllEmployees();
  console.table(employeeData[0]);
    console.log("addEmployee");
  }
  async function updateEmployeeRole() {
    const employeeUpdate = await inquirer.prompt([
      {
        type: "input",
      name: "employee_id",
      message: "What is the employee id",
      },
      {
        type: "input",
      name: "role_id",
      message: "What is the role id of the new employee role",
      },
    ])
    const newUpdate = await db.updateEmployee(
      employeeUpdate.employee_id,
      employeeUpdate.role_id
    )
    console.log("updateEmployeeRole");
    const employeeData = await db.findAllEmployees();
  console.table(employeeData[0]);
  }
  async function quit() {
    console.log("quit");
    process.exit(1)
  }

}

init();
