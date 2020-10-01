-- * Letting the user know to drop database if not created **
DROP DATABASE IF EXISTS employeetrackerdb;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE `employeetrackerdb`;

-- Use this table to start project.
USE `employeetrackerdb`;

-- Create the table needed.
-- Used PRIMARY KEY and FOREIGN KEY to make all three inner join
-- * **department**:
-- * **roles**:
-- * **employee**:
--   * **id** - INT PRIMARY KEY
-- * VARCHAR(30) awaits the command
-- * DECIMAL(P,D):
-- * 1. P : precision that represents the number of significant digits
-- * 2. D : scale that that represents the number of digits after the decimal point.

USE employeetracker_db;
-- * Extention Keeps formating code...
CREATE TABLE department
(
  id int not null
  AUTO_INCREMENT,
    name varchar
  (30),
    PRIMARY Key
  (id)
);
  CREATE TABLE role
  (
    id int not null
    AUTO_INCREMENT,
    title varchar
    (30),
    salary DECIMAL
    (10,2),
    department_id int,
    FOREIGN KEY
    (department_id) REFERENCES department
    (id),
  PRIMARY KEY
    (id)
);
    CREATE TABLE employee
    (
      id int not null
      AUTO_INCREMENT,
    first_name varchar
      (30),
    last_name varchar
      (30),
    role_id int,
    manager_id int null,
FOREIGN KEY
      (role_id) REFERENCES role
      (id),
  PRIMARY Key
      (id)
);