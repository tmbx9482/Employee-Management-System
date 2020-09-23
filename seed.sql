SEED
--* All details 
--* Inserting roles, salary, id's and data that will populate for tables
--* Inerting tables with fuctions
INSERT INTO department
    (name)
VALUES
    ("Marketing"),
    ("Engineering"),
    ("Human Resource"),
    ("IT"),
    ("Data Science");

INSERT INTO role
    (title, salary, department_id)

VALUES
    ("Human Resource", 65.000, 3),
    ("Consultant", 165.000, 1),
    ("Information Technologist", 225.000, 1),
    ("Database Administrator", 245.000, 5),
    ("Cloud Computing Engineers", 335.000, 4),
    ("QA Manager", 230.000, 5),
    ("Software/Application Developer", 185.000, 2);

INSERT INTO employee
    (first_name, last_name, manager_id)
VALUES
    ("Tim", "Cook", "1"),
    ("Jeff", "Bezos", "2"),
    ("Reed", "Hastings", "3"),
    ("Sheryl", "Sandberg", "4"),
    ("Mary", "Barra", "5")
