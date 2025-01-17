import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/api";
import Navbar from "./navbar";
import "./EditEmployee.css";

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
    console.log("Fetching employee with ID:", id);
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
    <div>
      <Navbar />
      <div>
        <form className="form-container bg-white box-shadow border-radius-10" onSubmit={handleSubmit}>
          <h2 className="form-title">Edit Employee</h2>
          {Object.keys(formData).map((field) => (
            <div className="form-group" key={field}>
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="text"
                className="form-input"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="form-button">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
