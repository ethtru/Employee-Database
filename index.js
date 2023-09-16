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
