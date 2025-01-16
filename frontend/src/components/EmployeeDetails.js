import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/api";
import "./EmployeeDetails.css";
import Navbar from "./navbar";
import "./index.css"

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch employee details.");
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <div>
      <Navbar />
      {employee ? (
        <div className="">
          <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
              <div className="page-header">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="title">
                      <h4>Profile</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 mb-10"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  className="da-card"
                  style={{ width: "47%", margin: "20px", marginTop: "0px" }}
                >
                  <div className="da-card-photo">
                    <img
                      src="/vendors/images/photo1.jpg"
                      alt=""
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover", // Optional: Ensures the image is well-fitted within the specified dimensions
                        borderRadius: "50%", // Optional: Makes the image circular (if desired)
                      }}
                    />

                    <div className="da-overlay da-slide-top">
                      <div className="da-social">
                        <ul className="clearfix">
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-envelope-o"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className="da-card-content"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      className="h5 mb-10"
                      style={{ textTransform: "capitalize" }}
                    >
                      {employee.name}
                    </h5>
                    <p className="mb-0" style={{ textTransform: "capitalize" }}>
                      {employee.created_at}
                    </p>
                    <div className="profile-info">
                      <h5 className="mb-20 h4 text-blue">
                        Contact Information
                      </h5>
                      <ul>
                        <li>
                          <span>
                            <h3>Name:</h3>
                          </span>
                          {employee.name}
                        </li>
                        <li>
                          <span>
                            <h3>Email Address:</h3>
                          </span>
                          {employee.email}
                        </li>
                        <li>
                          <span>
                            <h3>Phone Number:</h3>
                          </span>
                          {employee.phone}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="da-card"
                  style={{ width: "47%", margin: "20px", paddingLeft:"20px" , marginTop: "0px" }}
                >
                  <div
                    className="da-card-content"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      className="h5 mb-10"
                      style={{ textTransform: "capitalize" }}
                    >
                      {employee.name}
                    </h5>
                    <div className="profile-info">
                      <h5 className="mb-20 h4 text-blue">
                        Company Information
                      </h5>
                      <ul>
                        <li>
                          <span>
                            <h3>Department:</h3>
                          </span>
                          {employee.department}
                        </li>
                        <li>
                          <span>
                            <h3>Designation:</h3>
                          </span>
                          {employee.designation}
                        </li>
                        <li>
                          <span>
                            <h3>Salary:</h3>
                          </span>
                          {employee.salary}
                        </li>
                        <li>
                          <span>
                            <h3>Updated At:</h3>
                          </span>
                          {employee.updated_at}
                        </li>
                        <li>
                          <span>
                            <h3>Registered On:</h3>
                          </span>
                          {employee.created_at}
                        </li>
                      </ul>
                    </div>
                    <div className="profile-social">
                      <h5 className=" h5 text-blue">Social Links</h5>
                      <ul className="clearfix">
                        <li>
                          <a
                            href="#"
                            className="btn"
                            data-bgcolor="#3b5998"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="btn"
                            data-bgcolor="#1da1f2"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#007bb5"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#f46f30"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#c32361"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-dribbble"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#3d464d"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-dropbox"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#db4437"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-google-plus"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#bd081c"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-pinterest-p"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#00aff0"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-skype"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com"
                            className="btn"
                            data-bgcolor="#00b489"
                            data-color="#ffffff"
                          >
                            <i className="fab fa-vine"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p classNameName="details-loading">Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetails;




