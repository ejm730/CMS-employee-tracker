const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // Fetch all departments
    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department"
        );
    }

    // Fetch all roles
    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
        );
    }

    // Fetch all employees
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id"
        );
    }

    // Add a new department
    addDepartment(departmentName) {
        return this.connection.query(
            "INSERT INTO department (name) VALUES (?)",
            [departmentName]
        );
    }

    // Add a new role
    addRole(title, salary, departmentId) {
        return this.connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [title, salary, departmentId]
        );
    }

    // Add a new employee
    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [firstName, lastName, roleId, managerId]
        );
    }

    // Update an employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // ... You can add more methods for other functionalities ...
}

module.exports = new DB(connection);
