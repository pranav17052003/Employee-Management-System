import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
          const getUserRole = () => localStorage.getItem("role");
          const role = getUserRole();
          console.log(role);

        if (role === "Admin") navigate("/AdminDashboard");
        else if (role === "Viewer") navigate("/ViewerDashboard");
        else navigate("/login");
      } catch (err) {
        console.error("Failed to fetch role:", err);
        navigate("/login");
      }
    };
    fetchRole();
  }, [navigate]);

  return <div>Loading Dashboard...</div>;
};

export default Dashboard;
