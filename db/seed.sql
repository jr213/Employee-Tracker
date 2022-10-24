INSERT INTO department(department_name)
VALUES
('Management'),
('Engineering'),
('Finance'),
('Sales');


INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 120000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 98000, 2),
('Financial Advisor', 85000, 3),
('Sales Lead', 75000, 4);

INSERT INTO employee (f_name, l_name, role_id, manager_id)
VALUES
('Bill', 'Nye', 1, 0),
('Marco', 'Smith', 2, 1),
('Gordon', 'Ramsey', 3, 1),
('Bob', 'Lance', 4, 3);