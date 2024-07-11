const db = require("../models");
const Blog = db.blog;

// Create action
async function create(req, res, next) {
  try {
    const { title, body, comments, meta, category } = req.body;

    if (!title || !body || !category) {
      return res
        .status(400)
        .json({ error: "Title, body, and category are required." });
    }

    if (title.length > 20) {
      return res
        .status(400)
        .json({ error: "Title cannot be more than 20 characters." });
    }

    if (meta && (meta.votes < 0 || meta.favs < 0)) {
      return res
        .status(400)
        .json({ error: "Votes and favs cannot be negative." });
    }

    const newBlog = new Blog({
      title,
      body,
      comments,
      meta,
      category,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
}

// Edit action
async function edit(req, res, next) {
  try {
    const { title, body, comments, meta, category } = req.body;

    if (title && title.length > 20) {
      return res
        .status(400)
        .json({ error: "Title cannot be more than 20 characters." });
    }

    if (meta && (meta.votes < 0 || meta.favs < 0)) {
      return res
        .status(400)
        .json({ error: "Votes and favs cannot be negative." });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title, body, comments, meta, category },
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
}

// List action
async function list(req, res, next) {
  try {
    const blogs = await Blog.find({}).populate("comments").populate("category");

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Comments: blog.comments.map((comment) => comment.body),
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
}

// Delete action
async function remove(req, res, next) {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.status(200).json({ message: "Blog deleted successfully." });
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
