const bodyParser = require("body-parser");
const express = require("express");
const { EmployeeController } = require("../controllers");
const employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

employeeRouter.get("/:dept", EmployeeController.getEmployeeByDepartmentId);

module.exports = employeeRouter;
