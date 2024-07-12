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
blogRouter.put("/edit/:id", BlogController.edit);

// Delete route
blogRouter.delete("/delete", BlogController.remove);

// Search by id routes
blogRouter.get('/search/id/:id', BlogController.searchById);

// Search by name routes
blogRouter.get('/search/name/:name', BlogController.searchByName);

// Get blog by categoryId routes
blogRouter.get('/category/:categoryId', BlogController.searchByCategoryId);

module.exports = blogRouter;