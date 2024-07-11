const db = require("../models");
const Project = db.project;

function formatDate(date) {
  const d = new Date(date);
  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  return [day, month, year].join("/");
}

async function getAllProjects(req, res, next) {
  try {
    const projects = await Project.find().populate("department", "name _id");
    const formattedProjects = projects.map((project) => ({
      _id: project._id,
      name: project.name,
      description: project.description,
      startDate: formatDate(project.startDate),
      type: project.type,
      departmentId: project.department._id,
      departmentName: project.department.name,
    }));
    res.status(200).json(formattedProjects);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const newProject = new Project({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      type: req.body.type,
      department: req.body.department,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
}

const projectController = {
  create,
  getAllProjects,
};

module.exports = projectController;
