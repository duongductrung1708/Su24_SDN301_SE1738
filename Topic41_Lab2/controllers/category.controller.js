const db = require("../models");
const Category = db.category;

// Create action
async function create(req, res, next) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required." });
    }

    const newCategory = new Category({ name, description });

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
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

// Read action (get category by ID)
async function getById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
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
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: req.body.name, description: req.body.description }
      },
      { new: true, runValidators: true }
    );

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
