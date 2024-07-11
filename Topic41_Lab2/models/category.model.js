const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [30, "Category name cannot exceed 30 characters"],
    },
    description: {
      type: String,
      maxlength: [100, "Description cannot exceed 100 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
