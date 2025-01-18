import React from "react";
//import { Link } from "react-router-dom";
import "./navbar.css";
import "./index.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center login-nav">
          <div className="brand-logo">
            <a href="/dashboard">
              <h3>Employee Management System</h3>
            </a>
          </div> 
          <div className="nav-user-dropdown">
            <div className="dropdown">
              <a
                className="dropdown-toggle"
                href="/dashboard"
                role="button"
                data-toggle="dropdown"
              >
                <span className="user-avatar">
                  <img src="/vendors/images/photo1.jpg" alt="User Avatar" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/dashboard">
                  <i className="icon icon-user"></i> Dashboard
                </a>
                <a className="dropdown-item" href="/employees">
                  <i className="icon icon-settings"></i> Employee List
                </a>
                <a className="dropdown-item" href="/logout">
                  <i className="icon icon-logout"></i> Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
