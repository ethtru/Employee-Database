INSERT INTO department (id, name)
VALUES (001, 'Sales')
       (002, 'Engineering'),
       (003, 'Finance'),
       (004, 'legal'); 

INSERT INTO role (id, title, salary, department_id)        
VALUES (001, 'Salesperson', 80000, 1),
       (002, 'Lead Engineer', 150000, 2), 
       (003, 'Software Engineer', 120000, 2),
       (004, 'Account Manager', 160000, 3),
       (005, 'Accountant', 120000, 3),
       (006, 'Legal Team Lead', 250000, 4),
       (007, 'Lawyer', 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, 'Mike', 'Chan', 1, ),
       (002, 'Ashley', 'Rodriguez', 2),
       (003, 'Kevin', 'Tupik', 3, ),
       (004, 'Kunal', 'Singh', 4),
       (005, 'Malia', 'Brown', 5, ),
       (006, 'Sarah', 'Lourd', 6),
       (007, 'Tom', 'Allen', 7, );         