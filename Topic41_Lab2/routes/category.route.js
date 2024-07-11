const bodyParser = require("body-parser");
const express = require("express");
const { CategoryController } = require("../controllers");
const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

// Create route
categoryRouter.post("/create", CategoryController.create);

// Edit route
categoryRouter.put("/edit/:id", CategoryController.update);

// List route
categoryRouter.get("/list", CategoryController.getAll);

// Delete route
categoryRouter.delete("/delete/:id", CategoryController.remove);

module.exports = categoryRouter;
