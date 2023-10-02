INSERT INTO department (name)
VALUES ("Sales"),
       ("Returns"),
       ("Loss Prevention"),
       ("Engineer");

INSERT INTO role (title, salary, department_id)
VALUES ("Photographer", 80000, 1),
       ("Front Desk", 50000, 2),
       ("Main", 60000, 3),
       ("Lead", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Rodriguez", 1, NULL),
       ("Santi", "Jaramillo", 2, 1),
       ("Estevan", "Oriol", 3, 2),
       ("Frankie", "Quinones", 4, 3);