const bodyParser = require("body-parser");
const express = require("express");
const { BlogController } = require("../controllers");
const blogRouter = express.Router();
blogRouter.use(bodyParser.json());

// Create route
blogRouter.post("/create", BlogController.create);

// List routes
blogRouter.get("/list", BlogController.list);

// Edit route
blogRouter.put("/edit", BlogController.edit);

// Delete route
blogRouter.delete("/delete", BlogController.remove);

module.exports = blogRouter;