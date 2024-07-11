const db = require("../models");
const Employee = db.employee;
const Department = db.department;

function formatDate(date) {
  const d = new Date(date);
  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  return [day, month, year].join("/");
}

async function getEmployeeByDepartmentId(req, res, next) {
  try {
    const dept = req.params.dept;

    const department = await Department.findById(dept);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const employees = await Employee.find({ department: dept });

    const formattedEmployees = employees.map((employee) => ({
      _id: employee._id,
      name: employee.name,
      dob: formatDate(employee.dob),
      gender: employee.gender,
      position: employee.position,
    }));

    res.status(200).json(formattedEmployees);
  } catch (error) {
    next(error);
  }
}

const employeeController = {
  getEmployeeByDepartmentId,
};

module.exports = employeeController;
