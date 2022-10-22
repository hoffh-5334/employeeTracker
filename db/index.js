const connection = require("../config/connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;   
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
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role.id=employee.role_id
    LEFT JOIN department ON department.id=role.department_id
    LEFT JOIN employee manager ON manager.id=employee.manager_id`
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

addRole(title, salary, depID) {
  return this.connection.promise().query("INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)", [title, salary, depID])};
  
getManagers() {
  return this.connection.promise().query(
  `SELECT concat(e.first_name, " ", e.last_name) AS name, e.id AS value
  FROM employee e
  LEFT JOIN employee e2 ON e2.id = e.manager_id 
  WHERE e.manager_id  IS NULL`
  )
}

close() {
  this.connection.end();
};
};

module.exports = new DB(connection);