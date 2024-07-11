const bodyParser = require("body-parser");
const express = require("express");
const { ProjectController } = require("../controllers");
const projectRouter = express.Router();

projectRouter.use(bodyParser.json());

projectRouter.post("/", ProjectController.create);

projectRouter.get("/", ProjectController.getAllProjects);

module.exports = projectRouter;
