const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "Rivers22!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);
db.connect((err) => {
  if (err) throw err;
});

function showPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "Please choose from the options below",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answer) => {
      if (answer.userChoice === "view all departments") {
        viewAllDepartements();
      } else if (answer.userChoice === "add a department") {
        addDepartement();
      } else if (answer.userChoice === "view all roles") {
        viewAllRoles();
      } else if (answer.userChoice === "add a role") {
        addRole();
      } else if (answer.userChoice === "view all employees") {
        viewAllEmployees();
      } else if (answer.userChoice === "add an employee") {
        addEmployee();
      }
    });
}
async function viewAllDepartements() {
  const [departments] = await db.promise().query("select * from department");
  console.table(departments);
  showPrompts();
}
async function addDepartement() {
  const { department } = await inquirer.prompt([
    {
      type: "input",
      name: "department",
      message:
        "Please provide the name of the dapartment you would like to add.",
    },
  ]);
  await db
    .promise()
    .query(`Insert into department (name) values ('${department}')`);
  viewAllDepartements();
}
showPrompts();

async function viewAllRoles() {
  const [roles] = await db.promise().query("select * from role");
  console.table(roles);
  showPrompts();
}
async function addRole() {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Please enter the title for the role you would like to add",
    },
    {
      type: "input",
      name: "salary",
      message: "Please enter the salary for the role",
    },
    {
      type: "input",
      name: "department_id",
      message: "Please enter the department id for the role",
    },
  ]);

  await db
    .promise()
    .query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [
      title,
      salary,
      department_id,
    ]);
  viewAllRoles();
}
async function viewAllEmployees() {
  const [employees] = await db.promise().query("select * from employee");
  console.table(employees);
  showPrompts();
}
async function addEmployee() {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message:
        "Please enter the first name of the employee you would like to add",
    },
    {
      type: "input",
      name: "last_name",
      message:
        "Please enter the last name of the employee you would like to add",
    },
    {
      type: "input",
      name: "role_id",
      message:
        "Please enter the role id for the employee you would like to add.",
    },
    {
      type: "input",
      name: "manager_id",
      message:
        "Please enter the manager id for the employee you would like to add.",
    },
  ]);

  await db
    .promise()
    .query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
  viewAllEmployees();
}
