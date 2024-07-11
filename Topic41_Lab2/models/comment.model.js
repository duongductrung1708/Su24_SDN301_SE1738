const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "Body is required"],
      minlength: [1, "Comment cannot be empty"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      minlength: [2, "Author name must be at least 2 characters long"],
      maxlength: [50, "Author name cannot exceed 50 characters"],
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: [true, "Blog reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
