import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeList = await getEmployees();
        setEmployees(employeeList);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch employees.");
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.id !== id));
      alert("Employee deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee.");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/add/">Add Employee</Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.department}
            <Link to={`/edit/${employee.id}`}>Edit</Link>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
