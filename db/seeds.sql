-- seed departments table
INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Finance Div"),
       ("Legal Dept"),
       ("Sales Dept");
-- seed roles table
INSERT INTO roles (title, salary, department_id)
VALUES ("Sale Tm Lead", 120000, 4),
       ("Sales Person", 100000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Eng.", 120000, 1),
       ("Accts Manager", 160000, 2),
       ("Accountant 1", 125000, 2),
       ("Legal Tm Lead", 250000, 3),
       ("Staff Lawyer", 190000, 3);
-- seed employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Smith", 2, 1),
       ("Jeff", "Nelson", 4, 3),
       ("Charly", "Dole", 6, 5),
       ("Henry", "Green", 8, 7),
       ("Diesha", "Cane", 1, NULL),
       ("Tran", "Nguyen", 3, NULL),
       ("Dawn", "Henson", 5, NULL),
       ("Helen", "Jones", 7, NULL);