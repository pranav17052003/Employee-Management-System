import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/api";

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employee = await getEmployeeById(id);
        setFormData(employee);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch employee data.");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, formData);
      alert("Employee updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update employee.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Employee</h2>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
