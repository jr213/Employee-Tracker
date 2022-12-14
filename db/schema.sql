DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(25)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(25),
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(20),
    l_name VARCHAR(25),
    role_id INT NOT NULL,
    manager_id INT REFERENCES employee.id,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

DESCRIBE department;
DESCRIBE role;
DESCRIBE employee;


