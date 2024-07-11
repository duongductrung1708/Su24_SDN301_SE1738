const db = require("../models");
const Comment = db.comment;

// Create action
async function create(req, res, next) {
  try {
    const { body, author, blog } = req.body;

    if (!body || !author || !blog) {
      return res
        .status(400)
        .json({ error: "Body, author, and blog are required." });
    }

    const newComment = new Comment({ body, author, blog });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
}

// Read action (get all comments)
async function getAll(req, res, next) {
  try {
    const comments = await Comment.find().populate("blog");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

// Read action (get comment by ID)
async function getById(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id).populate("blog");
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

// Update action
async function update(req, res, next) {
  try {
    const { body, author, blog } = req.body;

    if (body && !body.trim()) {
      return res.status(400).json({ error: "Body cannot be empty." });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
}

// Delete action
async function remove(req, res, next) {
  try {
    const deletedComment = await Comment.findByIdAndRemove(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
