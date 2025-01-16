import React, { useState } from "react";
import { createEmployee } from "../services/api";
import Navbar from "./navbar";
import "./AddEmployee.css";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(formData);
      alert("Employee added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
      });
      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Failed to add employee.");
    }
  };

  return (
    <div>
      <Navbar />
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Employee</h2>
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
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;









							