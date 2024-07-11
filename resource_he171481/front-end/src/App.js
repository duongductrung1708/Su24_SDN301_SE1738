import React from "react";
import { Route, Routes } from "react-router-dom";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import EmployeeList from "./EmployeeList";

function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/employees/:dept" element={<EmployeeList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
