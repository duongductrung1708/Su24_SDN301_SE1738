import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of Projects</h1>
      <Link to={"/projects/add"} style={{ marginTop: "0.5rem" }}>
        Add new Project
      </Link>
      <Table striped bordered hover style={{ marginTop: "0.5rem" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Project name</th>
            <th>Description</th>
            <th>Start date</th>
            <th>Type</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project._id}</td>
              <td>
                <Link to={`/employees/${project.departmentId}`}>
                  {project.name}
                </Link>
              </td>
              <td>{project.description}</td>
              <td>{project.startDate}</td>
              <td>{project.type}</td>
              <td>{project.departmentName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectList;
