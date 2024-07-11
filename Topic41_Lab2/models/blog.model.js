const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [20, "Title cannot be more than 20 characters"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    meta: {
      votes: {
        type: Number,
        default: 0,
        min: [0, "Votes cannot be negative"],
      },
      favs: {
        type: Number,
        default: 0,
        min: [0, "Favs cannot be negative"],
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
