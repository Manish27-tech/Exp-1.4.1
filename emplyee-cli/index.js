const fs = require("fs");
const readline = require("readline");

const FILE = "employees.json";

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

let employees = [];

// Load employees from file
function loadEmployees() {
if (fs.existsSync(FILE)) {
const data = fs.readFileSync(FILE);
employees = JSON.parse(data);
}
}

// Save employees to file
function saveEmployees() {
fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

// Generate ID
function generateId() {
if (employees.length === 0) return 1;
return employees[employees.length - 1].id + 1;
}

// Add Employee
function addEmployee() {
rl.question("Enter employee name: ", (name) => {


    if (!name) {
        console.log("Invalid name");
        return menu();
    }

    rl.question("Enter age: ", (age) => {

        age = parseInt(age);

        if (isNaN(age)) {
            console.log("Invalid age");
            return menu();
        }

        rl.question("Enter department: ", (dept) => {

            const emp = {
                id: generateId(),
                name: name,
                age: age,
                department: dept
            };

            employees.push(emp);

            saveEmployees();

            console.log("Employee added successfully");
            menu();
        });
    });
});


}

// View Employees
function viewEmployees() {

if (employees.length === 0) {
    console.log("No employees found");
} else {
    console.table(employees);
}

menu();


}

// Update Employee
function updateEmployee() {

rl.question("Enter employee ID to update: ", (id) => {

    id = parseInt(id);

    const emp = employees.find(e => e.id === id);

    if (!emp) {
        console.log("Employee not found");
        return menu();
    }

    rl.question("Enter new name: ", (name) => {

        rl.question("Enter new age: ", (age) => {

            rl.question("Enter new department: ", (dept) => {

                if (name) emp.name = name;
                if (!isNaN(parseInt(age))) emp.age = parseInt(age);
                if (dept) emp.department = dept;

                saveEmployees();

                console.log("Employee updated successfully");

                menu();
            });
        });
    });
});


}

// Delete Employee
function deleteEmployee() {


rl.question("Enter employee ID to delete: ", (id) => {

    id = parseInt(id);

    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
        console.log("Employee not found");
        return menu();
    }

    employees.splice(index, 1);

    saveEmployees();

    console.log("Employee deleted");

    menu();
});


}

// Menu
function menu() {

console.log("\n===== Employee Management CLI =====");

console.log("1. Add Employee");
console.log("2. View Employees");
console.log("3. Update Employee");
console.log("4. Delete Employee");
console.log("5. Exit");

rl.question("Choose option: ", (choice) => {

    switch (choice) {

        case "1":
            addEmployee();
            break;

        case "2":
            viewEmployees();
            break;

        case "3":
            updateEmployee();
            break;

        case "4":
            deleteEmployee();
            break;

        case "5":
            console.log("Goodbye!");
            rl.close();
            break;

        default:
            console.log("Invalid option");
            menu();
    }

});


}

// Start program
loadEmployees();
menu();
