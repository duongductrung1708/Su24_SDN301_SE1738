import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";

const EmployeeList = () => {
  const { dept } = useParams();
  const [employees, setEmployees] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9999/departments/${dept}`)
      .then((response) => {
        setDepartmentName(response.data.name);
        return axios.get(`http://localhost:9999/employees/${dept}`);
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, [dept]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of Employees</h1>
      <Link to="/">Home page</Link>
      <h2>Department: {departmentName}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee name</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.gender}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
