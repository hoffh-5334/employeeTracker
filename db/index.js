const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;   // here we reach out to the db so we can do a query
    this.addDept = this.addDept.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
    this.updateEmployee=this.updateEmployee.bind(this)
    this.addRole=this.addRole.bind(this)
  }

 findAllDepts(){
  return this.connection.promise().query("SELECT * FROM department;");
 } 

 addDept(res) {
  return this.connection.promise().query("INSERT INTO department(name) VALUES(?)", res.department)};

  
findAllEmployees() {
  return this.connection.promise().query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role.id=employee.role_id
    LEFT JOIN department ON department.id=role.department_id
    LEFT JOIN employee manager ON manager.id=employee.manager_id`
  );
}

addEmployee(res) {
  return this.connection.promise().query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [res.first_name, res.last_name, res.role_id, res.manager])};

updateEmployee(employee, role) {
  return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [role, employee])
};

findAllRoles() {
  return this.connection.promise().query(
    `SELECT role.id, role.title, role.salary, department.name AS department_name
    FROM department
    INNER JOIN role on role.department_id=department.id;`
  );
}

addRole(res) {
  return this.connection.promise().query("INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)", [res.title, res.salary, res.department_id])};

getManagers() {
  return this.connection.promise().query(
  `SELECT concat(e.first_name, " ", e.last_name) AS name, e.id AS value
  FROM employee e
  LEFT JOIN employee e2 ON e2.id = e.manager_id 
  WHERE e.manager_id  IS NULL`
  )
}

getEmployees() {
  return this.connection.promise().query(
    `SELECT employee.id AS value, CONCAT(employee.first_name, " ", employee.last_name) AS name FROM employee`
  );
}

close() {
  this.connection.end();
};
};

module.exports = new DB(connection);