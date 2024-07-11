const bodyParser = require("body-parser");
const express = require("express");
const { DepartmentController } = require("../controllers");
const departmentRouter = express.Router();

departmentRouter.use(bodyParser.json());

departmentRouter.get("/:dept", DepartmentController.getDepartmentById);

departmentRouter.get("/", DepartmentController.getDepartments);

module.exports = departmentRouter;
