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
    console.log("\n");
    init();
  }
  async function viewAllRoles() {
    const roleInfo = await db.findAllRoles();
    console.table(roleInfo[0]);
    console.log("\n");
    init();
  }
  async function viewAllEmployees() {
    const employeeInfo = await db.findAllEmployees();
    console.table(employeeInfo[0]);
    console.log("\n");
    init();
  }
  async function addDepartment() {
    const department = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter name of the new department.",
      },
    ]);

    const newDepartment = await db.createDepartment(department.name);
    console.log(`Created ${department.name} department`);
    const departmentData = await db.findAllDepartments();
    console.table(departmentData[0]);
    console.log("\n");
    init();
  }
  async function addRole() {
    const aviableDepartments = await db.findAllDepartments();
    const parseDepartments = await aviableDepartments[0].map((e) => {
      return e.department;
    });

    const role = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of new role.",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the new role.",
      },
      {
        type: "list",
        name: "department_id",
        message: "What is the department id of the new role?",
        choices: parseDepartments,
      },
    ]);
    const departmentId = await aviableDepartments[0].find((e) => {
      return role.department_id === e.department;
    }).id;
    const newRole = await db.createRole(role.title, role.salary, departmentId);

    console.log("addRole");
    const roleData = await db.findAllRoles();
    console.table(roleData[0]);
    console.log("\n");
    init();
  }
  async function addEmployee() {
    const aviableRoles = await db.findAllRoles();
    const parseRoles = await aviableRoles[0].map((e) => {
      return e.title;
    });
    const aviableManagers = await db.findAllEmployees();
    const parseManagers = await aviableManagers[0].map((e) => {
      return `${e.first_name} ${e.last_name}`;
    });
    // console.log(parseRoles);
    const employee = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role id of the employee?",
        choices: parseRoles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "What is the manager id of the employee?",
        choices: parseManagers,
      },
    ]);
    const roleId = await aviableRoles[0].find((e) => {
      return employee.role_id === e.title;
    }).id;

    const managerId = await aviableManagers[0].find((e) => {
      return employee.manager_id === `${e.first_name} ${e.last_name}`;
    }).id;

    const newEmployee = await db.createEmployee(
      employee.first_name,
      employee.last_name,
      roleId,
      managerId
    );
    const employeeData = await db.findAllEmployees();
    console.table(employeeData[0]);
    console.log("addEmployee");
    console.log("\n");
    init();
  }
  async function updateEmployeeRole() {
    const aviableRoles = await db.findAllRoles();
    const parseRoles = await aviableRoles[0].map((e) => {
      return e.title;
    });
    const aviableEmpolyees = await db.findAllEmployees();
    const parseEmployees = await aviableEmpolyees[0].map((e) => {
      return `${e.first_name} ${e.last_name}`;
    });
    const employeeUpdate = await inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "What employee would you like to update?",
        choices: parseEmployees,
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role of the new employee role?",
        choices: parseRoles,
      },
    ]);
    const roleId = await aviableRoles[0].find((e) => {
      return employeeUpdate.role_id === e.title;
    }).id;

    const employeeId = await aviableEmpolyees[0].find((e) => {
      return employeeUpdate.employee_id === `${e.first_name} ${e.last_name}`;
    }).id;

    const newUpdate = await db.updateEmployee(employeeId, roleId);
    console.log("updateEmployeeRole");
    const employeeData = await db.findAllEmployees();
    console.table(employeeData[0]);
    console.log("\n");
    init();
  }
  async function quit() {
    console.log("quit");
    process.exit(1);
  }
}

init();
