// src/components/UserRegistration.js
import React, { useState } from "react";
import axios from "../api/axiosConfig";
import "./Registration.css"
import "./index.css"
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    role: "Viewer",
  });

  const navigate = useNavigate()

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register/", formData);
      setMessage("User registered successfully!");
      alert("User registered successfully!");
      navigate("/login")
      console.log(response.data);
    } catch (error) {
      setMessage(error.response.data.error || "Error during registration.");
    }
  };

  const handleClick = () => {
    navigate("/login")
  }


  const divStyle = {
    backgroundImage: "url('/vendors/images/background.jpg')",
    backgroundSize: "cover", // Ensures the image covers the entire container
    backgroundPosition: "center", // Centers the image
    height: "100vh", // Full viewport height
    width: "100%", // Full width
    color: "white", // Optional: for text readability
    marginTop: "0px",
    paddingTop: "20px",
  };

  return (
    <div className="login-page">
      <div className="login-header box-shadow" style={{marginBottom: "0px", paddingBottom: "0px"}}>
        <div className="container-fluid d-flex justify-content-between align-items-center login-nav">
          <div className="brand-logo">
            <a href="/login">
              <h3>EMS</h3>
            </a>
          </div>
          <div className="login-menu">
            <ul>
              <li>
                <a href="/login">
                  <h4>Login</h4>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={divStyle}>
        <div className="registration-form login-wrap" style={{marginTop : "0px"}}>
          <h2>USER REGISTRATION</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="select-role">
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              Confirm Password:
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
            <br />
            <button onClick={handleClick}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;



