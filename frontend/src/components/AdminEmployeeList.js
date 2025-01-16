import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/api";
import Navbar from "./navbar";
import "./EmployeeList.css";
import SoftDeleteEmployee from "./SoftDeleteEmployee";
import "./index.css"


const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Fetching employees for page:", currentPage);
    const fetchEmployees = async () => {
      try {
        const employeeList = await getEmployees({page : currentPage, search : searchQuery});
        console.log(employeeList)
        setEmployees(employeeList.results);
        setTotalPages(employeeList.total_pages);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch employees.");
      }
    };
    fetchEmployees();
  }, [currentPage, searchQuery]);

  const handleDelete = (deletedEmployeeId) => {
    // Update the state to reflect soft deletion
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== deletedEmployeeId)
    );
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    //setCurrentPage = 1;
  };

  return (
    <div>
      <Navbar />
      <div className="pd-ltr-20">
        <div class="card-box mb-30" style={{ paddingBottom: "20px" }}>
          <h2 class="h4 pd-20">Employee List</h2>
          <div className="search-container" style={{paddingLeft: "20px", paddingRight: "20px"}}>
            <input
              type="text"
              className="search-input"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="add-employee-btn">
              <Link className="add-employee-link" to="/add/">
                Add Employee
              </Link>
            </button>
          </div>
          <table class="data-table table nowrap">
            <thead>
              <tr>
                <th class="table-plus datatable-nosort">Employee</th>
                <th>Name</th>
                <th>Department</th>
                <th>Edit</th>
                <th>Details</th>
                <th>Delete</th>
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
                    <Link to={`/edit/${employee.id}`}>
                      <i class="fa fa-edit"></i>
                    </Link>
                  </td>
                  <td style={{ paddingLeft: "30px" }}>
                    <Link to={`/employee/${employee.id}`}>
                      <i class="fas fa-eye"></i>{" "}
                    </Link>
                  </td>
                  <td style={{ paddingLeft: "30px" }}>
                    <i
                      class="fa fa-trash"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <SoftDeleteEmployee
                        employeeId={employee.id}
                        onDelete={handleDelete}
                      />
                    </i>
                    {/* <button className="delete-btn"></button> */}
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

export default AdminEmployeeList;