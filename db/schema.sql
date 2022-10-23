DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    f_name VARCHAR(20),
    l_name VARCHAR(25),
    role_id INT NOT NULL,
    manager_id INT REFERENCES employee.id,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(25),
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    department_name VARCHAR(25)
)
