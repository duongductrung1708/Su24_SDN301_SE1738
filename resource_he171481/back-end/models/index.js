const mongoose = require("mongoose");
const Project = require("./project.model");
const Department = require("./department.model");
const Employee = require("./employee.model");

mongoose.Promise = global.Promise;

const db = {};

db.project = Project;
db.department = Department;
db.employee = Employee;
db.connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("Connect to MongoDB success."))
    .catch((error) => console.error(error.message));
};

module.exports = db;
