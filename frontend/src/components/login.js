import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "./index.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the server
      console.log("hello");
      const loginResponse = await axios.post("employees/login/", {
        username,
        password,
      });
      console.log(loginResponse);

      const { role } = loginResponse.data;

      // Store the role in local storage
      localStorage.setItem("role", role);
      
      console.log("Login successful. Role:", role);
      // localStorage.setItem("username", username);
      // Navigate based on the user's role
      if (role === "Admin") {
        const { username } = loginResponse.data;
        localStorage.setItem("username", username);
        console.log(username)
        navigate("/dashboard");
      } else if (role === "Viewer") {
        const { username } = loginResponse.data;
        localStorage.setItem("username", username);
        navigate("/dashboard");
      } else {
        setError("Unauthorized access");
      }
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login failed:", err);
    }
  };


  const handleClick = () => {
    navigate("/register")
  }

  return (
    <div className="login-page">
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center login-nav">
          <div className="brand-logo">
            <a href="login.html">
              <h3>Employee Management System</h3>
            </a>
          </div>
          <div className="login-menu">
            <ul>
              <li>
                <a href="/register">
                  <h4>Register</h4>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10 " style={{marginTop: "2%"}}>
                <div className="login-title" style={{ display: "flex", justifyContent: "center", flexDirection:"column", alignItems: "center" }}>
                  <div>
                    <img src="/vendors/images/login_user_image.jpg" style={{ height: "70px", widht: "70px", borderRadius: "10%", marginBottom:"5px" }} alt="user_login_image" />
                  </div>
                  <h2 className="text-center text-primary">Login</h2>
                  {error && <p className="login-error">{error}</p>}
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                  <label className="login-label">Username:</label>
                  <input
                    type="text"
                    className="login-input"
                    placeholder=" Enter your username "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <br />
                  <label className="login-label">Password:</label>
                  <input
                    type="password"
                    className="login-input"
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <br />
                  <button className="login-button" type="submit">
                    Sign In
                  </button>
                  <br />
                  <button className="login-button" onClick={handleClick}>Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

