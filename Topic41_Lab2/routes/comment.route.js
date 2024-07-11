const bodyParser = require("body-parser");
const express = require("express");
const { CommentController } = require("../controllers");
const commentRouter = express.Router();
commentRouter.use(bodyParser.json());

// Create route
commentRouter.post("/create", CommentController.create);

// Edit route
commentRouter.put("/edit/:id", CommentController.update);

// List route
commentRouter.get("/list", CommentController.getAll);

// Delete route
commentRouter.delete("/delete/:id", CommentController.remove);

module.exports = commentRouter;
