import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const AddProject = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    type: "",
    departmentName: "",
    departmentId: "",
  });

  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "departmentName") {
      const selectedDepartment = departments.find((dep) => dep.name === value);
      setProject((prevProject) => ({
        ...prevProject,
        [name]: value,
        departmentId: selectedDepartment ? selectedDepartment._id : "",
      }));
    } else {
      setProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project.name) {
      window.alert("Please enter the form fields that are required.");
      return;
    }

    const projectData = {
      ...project,
      department: project.departmentId,
    };

    axios
      .post("http://localhost:9999/projects", projectData)
      .then(() => {
        window.alert("Create success");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating the project:", error);
      });
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Add a new Project</h1>
      <Link to="/" style={{ marginLeft: "0.5rem" }}>
        Home page
      </Link>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectName">
          <Form.Label>
            Project Name <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={project.description}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="dd/mm/yyyy"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project type"
            name="type"
            value={project.type}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="departmentName"
            value={project.departmentName}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }}>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default AddProject;
