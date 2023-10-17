USE employee_tracker;

-- Seeding departments
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('HR');

-- Seeding roles
INSERT INTO role (title, salary, department_id) VALUES
('Manager', 50000.00, 1),
('Engineer', 60000.00, 2),
('HR Specialist', 45000.00, 3);

-- Seeding employees
-- Note: We're assuming the IDs from the previous inserts. In a real-world scenario, you'd fetch the appropriate IDs dynamically.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),        -- John Doe is a Manager from Sales and has no manager
('Jane', 'Smith', 2, 1),         -- Jane Smith is an Engineer and reports to John Doe
('Emily', 'Johnson', 3, 1);      -- Emily Johnson is an HR Specialist and also reports to John Doe
