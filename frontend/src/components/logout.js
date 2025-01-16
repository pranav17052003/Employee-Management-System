import React from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Logout.css"
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/employees/logout/");
      alert("Logout successful");
      localStorage.removeItem("user"); // Clear user info
      navigate("/login"); // Redirect to login
    } catch (error) {
      alert("An error occurred during logout");
    }
  };

  return (
    <div className="logout-modal">
      <div className="logout-modal-content">
        <div className="logout-message">Are you sure you want to logout?</div>
        <div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
