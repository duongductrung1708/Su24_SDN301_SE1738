const db = require("../models");
const Person = db.person;

function formatDate(date) {
  const d = new Date(date);
  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  return [day, month, year].join("/");
}

// Create action
async function create(req, res, next) {
  try {
    const { name, dob, blogs } = req.body;

    if (!name || !dob) {
      return res
        .status(400)
        .json({ message: "Name and Date of Birth are required" });
    }

    const newPerson = new Person({
      name,
      dob,
      blogs: blogs || [],
    });

    await newPerson.save().then((newDoc) => res.status(201).json(newDoc));
  } catch (error) {
    next(error);
  }
}

// Edit action
async function edit(req, res, next) {
  try {
    const { name, dob, blogs } = req.body;

    if (!name && !dob && !blogs) {
      return res.status(400).json({
        message: "At least one field (name, dob, blogs) is required for update",
      });
    }

    const updateFields = {};
    if (name) {
      updateFields.name = name;
    }
    if (dob) {
      updateFields.dob = dob;
    }
    if (blogs) {
      updateFields.$addToSet = { blogs };
    }

    const options = { new: true, runValidators: true };
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      updateFields,
      options
    ).populate({
      path: "blogs",
      select: "title",
    });

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    const formattedBlogs = updatedPerson.blogs.map((blog) => blog.title);

    const response = {
      Id: updatedPerson._id,
      FullName: updatedPerson.name,
      DateOfBirth: updatedPerson.dob,
      Blogs: formattedBlogs,
      UpdateAt: updatedPerson.updatedAt,
      CreateAt: updatedPerson.createdAt,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// List action
async function list(req, res, next) {
  try {
    const people = await Person.find({}).populate("blogs");

    if (!people.length) {
      return res.status(404).json({ message: "No persons found" });
    }

    const formattedPeople = people.map((p) => ({
      Id: p._id,
      FullName: p.name,
      DateOfBirth: p.dob,
      Blogs: p.blogs.map((b) => b.title),
    }));

    res.status(200).json(formattedPeople);
  } catch (error) {
    next(error);
  }
}

// Delete action
async function remove(req, res, next) {
  try {
    const deletedPerson = await Person.findByIdAndRemove(req.params.id);

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  edit,
  list,
  remove,
};
