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
blogRouter.delete("/delete/:id", BlogController.remove);

// Search by id route
blogRouter.get("/search/id/:id", BlogController.searchById);

// Search by name route
blogRouter.get("/search/name/:name", BlogController.searchByName);

// Get blog by categoryId route
blogRouter.get("/category/:categoryId", BlogController.searchByCategoryId);

// Get blog by votes range route
blogRouter.get("/votesRange", BlogController.searchByVotesRange);

// Get blog by favs range route
blogRouter.get("/favsRange", BlogController.searchByFavsRange);

// Get blog by both votes and favs range route
blogRouter.get("/votesAndFavsRange", BlogController.searchByVotesAndFavsRange);

module.exports = blogRouter;
