import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/api";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch employee details.");
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <div>
      {employee ? (
        <div>
          <h2>{employee.name}</h2>
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.phone}</p>
          <p>Department: {employee.department}</p>
          <p>Designation: {employee.designation}</p>
          <p>Salary: {employee.salary}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
