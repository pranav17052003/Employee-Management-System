import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import "./index.css"

const Navbar = () => {
  return (
    <nav>
      <div class="login-header box-shadow">
        <div class="container-fluid d-flex justify-content-between align-items-center login-nav">
          <div class="brand-logo">
            <a href="/dashboard">
              <h3>Employee Management System</h3>
            </a>
          </div>
          <div class="nav-user-dropdown">
            <div class="dropdown">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
              >
                <span class="user-avatar">
                  <img src="/vendors/images/photo1.jpg" alt="User Avatar" />
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="/dashboard">
                  <i class="icon icon-user"></i> Dashboard
                </a>
                <a class="dropdown-item" href="/employees">
                  <i class="icon icon-settings"></i> Employee List
                </a>
                <a class="dropdown-item" href="/logout">
                  <i class="icon icon-logout"></i> Log Out
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
