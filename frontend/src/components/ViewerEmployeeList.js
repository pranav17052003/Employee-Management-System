import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/api";
import Navbar from "./navbar";
import "./EmployeeList.css";

const ViewerEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
      console.log("Fetching employees for page:", currentPage);
      const fetchEmployees = async () => {
        try {
          const employeeList = await getEmployees({page : currentPage});
          console.log(employeeList)
          setEmployees(employeeList.results);
          setTotalPages(employeeList.total_pages);
        } catch (error) {
          console.error(error);
          alert("Failed to fetch employees.");
        }
      };
      fetchEmployees();
  }, [currentPage]);
  


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pd-ltr-20">
        <div class="card-box mb-30" style={{ paddingBottom: "20px", marginTop: "20px" }}>
          <h2 class="h4 pd-20">Employee List</h2>
          <table class="data-table table nowrap" style={{marginLeft: "70px"}}>
            <thead>
              <tr>
                <th class="table-plus datatable-nosort">Employee</th>
                <th>Name</th>
                <th>Department</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr>
                  <td class="table-plus" style={{ paddingLeft: "15px" }}>
                    <img
                      src="/vendors/images/photo1.jpg"
                      width="70"
                      height="70"
                      alt=""
                    />
                  </td>
                  <td style={{ paddingLeft: "20px" }}>
                    <h5 class="font-16">{employee.name}</h5>
                    {employee.name}
                  </td>
                  <td style={{ paddingLeft: "15px" }}>{employee.department}</td>
                  <td style={{ paddingLeft: "30px" }}>
                    <Link to={`/employee/${employee.id}`}>
                      <i class="fas fa-eye"></i>{" "}
                    </Link>
                  </td>
              
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerEmployeeList;
