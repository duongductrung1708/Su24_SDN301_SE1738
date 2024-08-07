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
      type: Schema.Types.ObjectId,
      ref: "person",
      required: [true, "Author is required"],
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: [true, "Blog ID is required"],
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
