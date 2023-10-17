const inquirer = require('inquirer');
const db = require('./queries');

const mainPrompt = async () => {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    });

    switch (choice) {
        case 'View all departments':
            const departments = (await db.findAllDepartments())[0];
            const formattedDepartments = departments.map(dept => ({
                ID: dept.id,
                Name: dept.name
            }));
            console.table(formattedDepartments);
            break;

        case 'View all roles':
            const roles = (await db.findAllRoles())[0];
            const formattedRoles = roles.map(role => ({
                ID: role.id,
                Title: role.title,
                Salary: role.salary,
                Department: role.department
            }));
            console.table(formattedRoles);
            break;

        case 'View all employees':
            const employees = (await db.findAllEmployees())[0];
            const formattedEmployees = employees.map(emp => ({
                ID: emp.id,
                'First Name': emp.first_name,
                'Last Name': emp.last_name,
                Title: emp.title,
                Department: emp.department,
                Salary: emp.salary,
                Manager: emp.manager
            }));
            console.table(formattedEmployees);
            break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department:',
            });
            await db.addDepartment(departmentName);
            console.log(`Added new department: ${departmentName}`);
            break;

        case 'Add a role':
            const { title, salary, departmentId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role:',
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID for this role:',
                }
            ]);
            await db.addRole(title, salary, departmentId);
            console.log(`Added new role: ${title}`);
            break;

        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee:',
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the role ID for this employee:',
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the manager ID for this employee (or leave blank if none):',
                    default: null
                }
            ]);
            await db.addEmployee(firstName, lastName, roleId, managerId || null);
            console.log(`Added new employee: ${firstName} ${lastName}`);
            break;

        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee you want to update:',
                },
                {
                    type: 'input',
                    name: 'newRoleId',
                    message: 'Enter the new role ID for this employee:',
                }
            ]);
            await db.updateEmployeeRole(employeeId, newRoleId);
            console.log(`Updated employee's role.`);
            break;

        case 'Exit':
            process.exit();
    }

    // Loop back to the main menu
    await mainPrompt();
};

module.exports = mainPrompt;
