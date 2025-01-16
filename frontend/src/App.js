import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import EmployeeList from "./components/EmployeeList";
import AdminEmployeeList from "./components/AdminEmployeeList";
import ViewerEmployeeList from "./components/ViewerEmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeDetails from "./components/EmployeeDetails";
import { fetchCsrfToken } from "./utils/csrf";
import Login from "./components/login";
import Logout from "./components/logout";
import AdminDashboard from "./components/AdminDashboard";
import ViewerDashboard from "./components/ViewerDashboard";
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";


function App() {
  useEffect(() => {
    // Fetch CSRF token when the app starts
    fetchCsrfToken();
  }, []);

  const getUserRole = () => localStorage.getItem("role");
  const role = getUserRole();
  console.log(role)
  const renderRoutes = () => {
    if (!role) {
      // If no role, redirect to login
      return <Route path="*" element={<Navigate to="/login" replace />} />;
    }

    switch (role) {
      case "Admin":
        return (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<AdminEmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </>
        );
      case "Viewer":
        return (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<ViewerEmployeeList />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/ViewerDashboard" element={<ViewerDashboard />} />
          </>
        );
      default:
        // If role is invalid, redirect to login
        return <Route path="*" element={<Navigate to="/login" replace />} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {renderRoutes()}
      </Routes>
    </Router>
  );
}

export default App;
