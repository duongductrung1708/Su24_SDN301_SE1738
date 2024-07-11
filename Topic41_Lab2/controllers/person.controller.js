const db = require("../models");
const Person = db.person;
const Blog = db.blog;

function formatDate(date) {
  const d = new Date(date);
  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  return [day, month, year].join("/");
}

async function create(req, res, next) {
  try {
    const { name, dob } = req.body;

    if (!name || !dob) {
      return res
        .status(400)
        .json({ message: "Name and Date of Birth are required" });
    }

    const newPerson = new Person({
      name,
      dob,
    });

    await newPerson.save().then((newDoc) => res.status(201).json(newDoc));
  } catch (error) {
    next(error);
  }
}

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
      DateOfBirth: formatDate(updatedPerson.dob),
      Blogs: formattedBlogs,
      UpdateAt: updatedPerson.updatedAt,
      CreateAt: updatedPerson.createdAt,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const people = await Person.find({}).populate("blogs");

    if (!people.length) {
      return res.status(404).json({ message: "No persons found" });
    }

    const formattedPeople = people.map((p) => ({
      Id: p._id,
      FullName: p.name,
      DateOfBirth: formatDate(p.dob),
      Blogs: p.blogs.map((b) => b.title),
    }));

    res.status(200).json(formattedPeople);
  } catch (error) {
    next(error);
  }
}

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

// async function search(req, res, next) {
//   try {
//     const { name, id } = req.query;

//     let people;
//     if (name) {
//       people = await Person.find({ name: new RegExp(name, 'i') }).populate("blogs");
//     } else if (id) {
//       people = await Person.findById(id).populate("blogs");
//       if (people) people = [people];
//     } else {
//       return res.status(400).json({ message: "Name or ID query parameter is required" });
//     }

//     if (!people || !people.length) {
//       return res.status(404).json({ message: "No persons found" });
//     }

//     const formattedPeople = people.map(p => ({
//       Id: p._id,
//       FullName: p.name,
//       DateOfBirth: formatDate(p.dob),
//       Blogs: p.blogs.map(b => b.title),
//     }));

//     res.status(200).json(formattedPeople);
//   } catch (error) {
//     next(error);
//   }
// }

async function searchByName(req, res, next) {
  try {
    const { name } = req.params;
    const people = await Person.find({ name: new RegExp(name, "i") }).populate(
      "blogs"
    );

    if (!people.length) {
      return res.status(404).json({ message: "No persons found" });
    }

    const formattedPeople = people.map((p) => ({
      Id: p._id,
      FullName: p.name,
      DateOfBirth: formatDate(p.dob),
      Blogs: p.blogs.map((b) => b.title),
    }));

    res.status(200).json(formattedPeople);
  } catch (error) {
    next(error);
  }
}

async function searchById(req, res, next) {
  try {
    const { id } = req.params;
    const person = await Person.findById(id).populate("blogs");

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const formattedPerson = {
      Id: person._id,
      FullName: person.name,
      DateOfBirth: formatDate(person.dob),
      Blogs: person.blogs.map((b) => b.title),
    };

    res.status(200).json(formattedPerson);
  } catch (error) {
    next(error);
  }
}

async function filterByDob(req, res, next) {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const people = await Person.find({
      dob: { $gte: start, $lte: end },
    }).populate("blogs");

    if (!people.length) {
      return res.status(404).json({ message: "No persons found" });
    }

    const formattedPeople = people.map((p) => ({
      Id: p._id,
      FullName: p.name,
      DateOfBirth: formatDate(p.dob),
      Blogs: p.blogs.map((b) => b.title),
    }));

    res.status(200).json(formattedPeople);
  } catch (error) {
    next(error);
  }
}

async function getPersonByBlogId(req, res, next) {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const person = await Person.findOne({ blogs: blogId });

    if (!person) {
      return res
        .status(404)
        .json({ message: "Person not found for this blog" });
    }

    const formattedPerson = {
      Id: person._id,
      FullName: person.name,
      DateOfBirth: formatDate(person.dob),
    };

    res.status(200).json(formattedPerson);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  edit,
  list,
  remove,
  filterByDob,
  searchByName,
  searchById,
  getPersonByBlogId,
  // search,
};
