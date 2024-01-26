-- seed departments table
INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");
-- seed roles table
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Sales Person", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Accounts Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);
-- seed employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Smith", 2, 1),
       ("Jeff", "Nelson", 4, 3),
       ("Charles", "Dole", 6, 5),
       ("Mike", "Green", 8, 7),
       ("Diesha", "Hodges", 1, NULL),
       ("Tran", "Nguyen", 3, NULL),
       ("Dawn", "Jackson", 5, NULL),
       ("Helen", "Peters", 7, NULL);