import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Employee Management</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Employee</Link>
      </div>
    </nav>
  );
};

export default Navbar;
