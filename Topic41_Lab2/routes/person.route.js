const bodyParser = require("body-parser");
const express = require("express");
const { PersonController } = require("../controllers");
const personRouter = express.Router();
personRouter.use(bodyParser.json());

// Create route
personRouter.post("/create", PersonController.create);

// Edit route
personRouter.put("/edit/:id", PersonController.edit);

// List route
personRouter.get("/list", PersonController.list);

// Delete route
personRouter.delete("/delete", PersonController.remove);

// // Search route
// personRouter.get('/search', PersonController.search);

// Search by id route
personRouter.get("/search/id/:id", PersonController.searchById);

// Search by name route
personRouter.get("/search/name/:name", PersonController.searchByName);

// Filter by age route
personRouter.get("/filterByDob", PersonController.filterByDob);

// Get person by blog id
personRouter.get("/blog/:blogId", PersonController.getPersonByBlogId);

// Sort person by name
personRouter.get("/sortByName", PersonController.sortPersonByName);

module.exports = personRouter;
