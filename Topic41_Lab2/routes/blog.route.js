const bodyParser = require("body-parser");
const express = require("express");
const { BlogController } = require("../controllers");
const blogRouter = express.Router();
blogRouter.use(bodyParser.json());

// Create route
blogRouter.post("/create", BlogController.create);

// Edit route

module.exports = blogRouter;