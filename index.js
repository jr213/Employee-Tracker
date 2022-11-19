const inquirer = require('inquirer');
const db = require('connection.js');

db.connect((error) => {
    if (error) throw error;
    console.log('Connected.');
    startSyst();
})

const initialQuestion = [
    {
        type: 'list',
        name: 'whatToDo',
        message: 'Choose what to do.',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit'
        ]
    }
]

const whatDepartment = [
    {
        name: 'deptName',
        message: 'Give the department you would like to add a name.'
    }
]

const whatRole = [
    {
        name: 'roconstitle',
        message: 'Give the new role a title.'
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Give this role a salary.'
    },
    {
        name: 'whichDept',
        type: 'list',
        message: 'What department is this role for?',
        choices: []
    }
]

const whatEmployee = [
    {
        name: 'fName',
        message: 'What is the first name of the employee?'
    },
    {
        name: 'lName',
        message: 'What is the last name of the employee?'
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the role of the employee?',
        choices: []
    },
    {
        type: 'list',
        name: 'whichManager',
        message: 'Who is the manager of the employee?',
        choices: []
    }
]

const updateEmployeeQuestion = [
    {
        type: 'list',
        name: 'employeeName',
        message: "What is the name of the employee who's role you'd like to update?",
        choices: []
    },
    {
        type: 'list',
        name: 'newRole',
        message: 'What is the new role of this employee?',
        choices: []
    }
]



function startSyst () {
    inquirer.prompt(initialQuestion).then((answers) => {
        switch (answers.whatToDo) {
            case 'View All Employees':
                getEmployees();
            break;
            case 'View All Roles':
                getRoles();
            break;
            case 'View All Departments':
                getDepartments();
            break;
            case 'Add Department':
                addDepartment();
            break;
            case 'Add Role':
                addRole();
            break;
            case 'Add Employee':
                addEmployee();
            break;
            case 'Update Employee Role':
                updateEmployeeRole();
            break;
            case 'Quit':
                console.log('Bye!');
                process.exit();
            default:
                break;
        }
    })
};

const getEmployees = () => {
    db.query('SELECT * FROM employee;', (err, data) => {
        console.table(data);
        startSyst();
    })
};

const getRoles = () => {
    db.query('SELECT * FROM role;', (err, data) => {
        console.table(data);
        startSyst();
    })
};

const getDepartments = () => {
    db.query('SELECT * FROM department;', (err, data) => {
        console.table(data);
        startSyst();
    })
};

const addDepartment = () => {
    inquirer.prompt(whatDepartment)
    .then((response) => {
        db.query(`INSERT INTO department (name) VALUES (?);`, [response.deptName], (err, data) => {
            console.log('New department has been successfully added!')
            startSyst();
        })
    })
};

const addRole = () => {
    db.query('SELECT * FROM department;', (err, data) => {
        whatRole[2].choices = data.map((element) => ({value: element.id, name: element.name}));
        inquirer.prompt(whatRole)
        .then((response) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`, 
            [response.roconstitle, response.salary, response.whichDept], 
            (err, data) => {
                console.log('New role has been successfully added!')
                startSyst();
            })
        })
    })
};

const addEmployee = () => {
    db.query('SELECT * FROM role;', (err, data) => {
        whatEmployee[2].choices = data.map((element) => ({value: element.id, name: element.title}))
        db.query('SELECT * FROM employee;', (err, data) => {
            whatEmployee[3].choices = data.map((element) => ({value: element.id, name: element.first_name+' '+element.last_name}));
            whatEmployee[3].choices.push({value: null, name: 'None'});
            inquirer.prompt(whatEmployee)
            .then((response) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, 
                [response.fName, response.lName, response.role, response.whichManager], 
                (err, data) => {
                    if (err) throw err;
                    console.log('New employee has been successfully added!')
                    startSyst();
                })
            })
        })
    })
};

const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee;', (err, data) => {
        updateEmployeeQuestion[0].choices = data.map((element) => ({value: element.id, name: element.first_name+' '+element.last_name}));
        db.query('SELECT * FROM role;', (err, data) => {
            updateEmployeeQuestion[1].choices = data.map((element) => ({value: element.id, name: element.title}))
            inquirer.prompt(updateEmployeeQuestion)
            .then((response) => {
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, 
                [response.newRole, response.employeeName], 
                (err, data) => {
                    if (err) throw err;
                    console.log("Employee's role has been successfully updated!")
                    startSyst();
                })
            })
        })
    })
};

