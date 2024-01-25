-- Create & use employee DB
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- Department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
-- Role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);
-- employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30), NOT NULL
    role_id INT NOT NULL,
    manager_id INT
);

