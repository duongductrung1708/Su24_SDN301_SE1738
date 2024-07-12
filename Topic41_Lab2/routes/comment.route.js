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

// Get comments by Id routes
commentRouter.get("/:id", CommentController.getById);

// Delete route
commentRouter.delete("/delete/:id", CommentController.remove);

// Get comments by blogId routes
commentRouter.get("/blog/:blogId", CommentController.getByBlogId);

// Get comments by personId and blogId routes
commentRouter.get("/person/:personId/blog/:blogId", CommentController.getCommentByPersonAndBlog);

module.exports = commentRouter;
