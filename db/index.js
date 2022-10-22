const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;   // here we reach out to the db so we can do a query
    this.addDept = this.addDept.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.addRole = this.addRole.bind(this)
  }

 findAllDepts(){
  return this.connection.promise().query("SELECT * FROM department;");
 } 

 addDept(res) {
  return this.connection.promise().query(
    "INSERT INTO department (name) VALUES (?);", [res.department]
  );
}
  
findAllEmployees() {
  return this.connection.promise().query(
    "SELECT e.id as ID, concat(e.first_name, ' ', e.last_name) AS Name e.manager_id AS Manager, r.title AS Role r.salary AS Salary, d.name as Department FROM employee e INNER JOIN role r ON r.id=role_id INNER JOIN department d ON d.id=department_id;"
  );
}

updateEmployee(res){
  return this.connection.promise().query(
    "UPDATE employee SET title = (?) WHERE title = (?);" [res.employee, res.title, res.role_id]
  )
}

findAllRoles(){
  return this.connection.promise().query("SELECT * FROM role;");
}

addRole(res) {
  return this.connection.promise().query(
    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);", [res.title, res.salary, res.department_id]
  );
} 

}

module.exports = new DB(connection);