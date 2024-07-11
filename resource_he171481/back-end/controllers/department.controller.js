const db = require("../models");
const Department = db.department;

async function getDepartmentById(req, res, next) {
  try {
    const dept = req.params.dept;

    const department = await Department.findById(dept);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
}

async function getDepartments(req, res, next) {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
}

const departmentController = {
  getDepartmentById,
  getDepartments,
};

module.exports = departmentController;
