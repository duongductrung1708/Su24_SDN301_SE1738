const db = require("../models");
const Category = db.category;
const Blog = db.blog; // Assuming you have a Blog model

// Create action
async function create(req, res, next) {
  try {
    const { name, description, blogs } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required." });
    }

    const newCategory = new Category({ name, description, blogs });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Category name must be unique." });
    }
    next(error);
  }
}

// Read action (get all categories)
async function getAll(req, res, next) {
  try {
    const categories = await Category.find().populate({
      path: "blogs",
      select: "title",
    });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

// Read action (get category by ID)
async function getById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "blogs",
      select: "title",
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

// Update action
async function update(req, res, next) {
  try {
    const { blog } = req.body;

    if (!blog) {
      return res.status(400).json({ error: "Blog ID must be provided." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { blogs: blog } },
      { new: true, runValidators: true }
    ).populate({
      path: "blogs",
      select: "title",
    });

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Category name must be unique." });
    }
    next(error);
  }
}

// Delete action
async function remove(req, res, next) {
  try {
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
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
