import React from "react";
import "./AdminDashboard.css"
import Navbar from "./navbar";
import "./index.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const AdminDashboard = () => {
  //for fetching username from local storage
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username"); // Retrieve username from localStorage
    const savedRole = localStorage.getItem("role"); // Retrieve role from localStorage
    if (savedUsername && savedRole) {
      setUsername(savedUsername);
      setRole(savedRole);
    } else {
      // Handle the case where the user is not logged in
      console.error("No username found. Redirecting to login.");
      window.location.href = "/login"; // Redirect to login page
    }
  }, []);

  //for fetching all users from database total count, inactive and active to make a graph for them
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/employees1/"); // Adjust endpoint as needed
        const employees = response.data.results;
        const nextPage = response.data.total_pages;
        let num = parseInt(nextPage, 10);
        const stri = ""
        while (num) {
          const response = await axios.get(`/api/employees1/?page=${num}`); // Adjust endpoint
          employees.push(...response.data.results);
          num = num - 1;
        }
        
        // Calculate summary
        const totalEmployees = employees.length;
        const activeEmployees = employees.filter((emp) => emp.is_active).length;
        const inactiveEmployees = totalEmployees - activeEmployees;

        setSummary({
          total: totalEmployees,
          active: activeEmployees,
          inactive: inactiveEmployees,
        });

        setData(employees);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };

    fetchData();
  }, []);

  // Generate data for Chart.js
  const departments = data.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: "Number of Employees",
        data: Object.values(departments),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="pd-ltr-20">
        <div className="card-box pd-20 height-100-p mb-30">
          <div
            className="row align-items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="col-md-4">
              <img src="/vendors/images/banner-img.png" alt="" />
            </div>
            <div className="col-md-8">
              <h4 className="font-20 weight-500 mb-10 text-capitalize">
                Welcome back{" "}
                <div className="weight-600 font-30 text-blue capitalize-text">
                  {username || "Guest"}!
                </div>
                <div className="weight-50 font-3 text-black capitalize-text">
                  ({role || ""})
                </div>
              </h4>
              <p class="font-18 max-width-600">
                Welcome to Your Dashboard! Here, you can find all the essential
                details about your profile, tasks, and updates. Stay informed,
                track your progress, and access important resources seamlessly.
                We’re here to support you every step of the way. Have a
                productive day!
              </p>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div
            className="col-xl-3 mb-30"
            style={{ flex: "1 1 calc(25% - 10px)" }}
          >
            <div className="card-box height-100-p widget-style1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="widget-data">
                  <div className="h4 mb-0">View Employee List</div>
                  <div className="weight-600 font-14">
                    <a href="/employees">Click here!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="card-box pd-20 height-100-p mb-30">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
              }}
            >
              <h3>Total Employees</h3>
              <p>{summary.total}</p>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
              }}
            >
              <h3>Active Employees</h3>
              <p>{summary.active}</p>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#ffebee",
                borderRadius: "8px",
              }}
            >
              <h3>Inactive Employees</h3>
              <p>{summary.inactive}</p>
            </div>
          </div>

          {/* Chart Section */}
          <div style={{ width: "70%", margin: "0 auto" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Employees by Department",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
