# Employee Management System

A full-stack web application for managing employees efficiently using Django, React, and PostgreSQL. This system includes features like adding, updating, deleting, and viewing employee details, along with user authentication and role-based access control.

---

## Features

### 1. Authentication
- **User Login and Logout**: Secure authentication using Django's built-in authentication system.
- **Role-based Access Control**: Different access levels for Admin and Viewer roles.
- **JWT-based Authentication** (Bonus): Enhanced security using JSON Web Tokens.

### 2. Employee Management (CRUD Operations)
- **Add Employee**: Form to add new employees with fields like Name, Email, Phone, Department, Designation, and Salary.
- **Update Employee**: Edit existing employee details.
- **Delete Employee**: Soft delete functionality to mark employees as inactive.
- **View Employees**: Paginated, searchable, and sortable employee table.

### 3. Employee Details Page
- Click on an employee's name to view detailed information about the employee.

### 4. Dashboard
- **Graphical Representation**: Display employees by department using React chart libraries (e.g., Chart.js or Recharts).
- **Summary**: Overview of total employees, active employees, and inactive employees.

### 5. Backend API
- RESTful APIs using Django Rest Framework (DRF) for seamless frontend-backend integration.

### 6. Database
- PostgreSQL database schema for efficient data storage and retrieval.

### Bonus Features
- **CSV Export**: Export employee data as a CSV file.
- **Unit and Integration Tests**: Comprehensive tests for both frontend and backend.

---

## Tech Stack

- **Backend**: Django, Django Rest Framework (DRF)
- **Frontend**: React.js, Axios, React Router
- **Database**: PostgreSQL
- **Deployment**: Docker

---

## Installation and Setup

### Prerequisites
- Docker and Docker Compose installed
- Node.js and npm installed (for local frontend development)

### Clone the Repository
```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

set the env in your main: python 


Here's a structured and comprehensive README file for your GitHub repository:

markdown
Copy
Edit
# Employee Management System

A full-stack web application for managing employees efficiently using Django, React, and PostgreSQL. This system includes features like adding, updating, deleting, and viewing employee details, along with user authentication and role-based access control.

---

## Features

### 1. Authentication
- **User Login and Logout**: Secure authentication using Django's built-in authentication system.
- **Role-based Access Control**: Different access levels for Admin and Viewer roles.
- **JWT-based Authentication** (Bonus): Enhanced security using JSON Web Tokens.

### 2. Employee Management (CRUD Operations)
- **Add Employee**: Form to add new employees with fields like Name, Email, Phone, Department, Designation, and Salary.
- **Update Employee**: Edit existing employee details.
- **Delete Employee**: Soft delete functionality to mark employees as inactive.
- **View Employees**: Paginated, searchable, and sortable employee table.

### 3. Employee Details Page
- Click on an employee's name to view detailed information about the employee.

### 4. Dashboard
- **Graphical Representation**: Display employees by department using React chart libraries (e.g., Chart.js or Recharts).
- **Summary**: Overview of total employees, active employees, and inactive employees.

### 5. Backend API
- RESTful APIs using Django Rest Framework (DRF) for seamless frontend-backend integration.

### 6. Database
- PostgreSQL database schema for efficient data storage and retrieval.

### Bonus Features
- **CSV Export**: Export employee data as a CSV file.
- **Unit and Integration Tests**: Comprehensive tests for both frontend and backend.

---

## Tech Stack

- **Backend**: Django, Django Rest Framework (DRF)
- **Frontend**: React.js, Axios, React Router
- **Database**: PostgreSQL
- **Deployment**: Docker

---

## Installation and Setup

### Prerequisites
- Docker and Docker Compose installed
- Node.js and npm installed (for local frontend development)

### Clone the Repository
```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

Set virtual-environmnet in your main:
  python -m venv env

Backend Setup:
  Navigate to the backend directory:
  cd backend
    run command python manage.py runserver
    

Frontend Setup:
  Navigate to the frontend directory:
  cd frontend
  npm install
  Start the development server:
  npm start
  Access the React app at http://localhost:3000.

