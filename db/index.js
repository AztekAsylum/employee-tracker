const connection = require("../config/connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  findAllDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name AS department FROM department;"
      );
  }

  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = department_id;"
      );
  }
  createDepartment(department) {
    return this.connection
    .promise()
    .query(
      "INSERT INTO department (name) VALUES (?);",
      department
    );

  }
}
module.exports = new DB(connection);
