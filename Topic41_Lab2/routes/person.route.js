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

module.exports = personRouter;