const db = require("../models");
const Comment = db.comment;
const Blog = db.blog;
const Person = db.person;

// Create action
async function create(req, res, next) {
  try {
    const { body, author, blog } = req.body;

    if (!body || !author || !blog) {
      return res
        .status(400)
        .json({ error: "Body, author, and blog are required." });
    }

    const person = await Person.findById(author);
    if (!person) {
      return res.status(404).json({ error: "Author not found" });
    }

    const blogExists = await Blog.findById(blog);
    if (!blogExists) {
      return res.status(404).json({ error: "Blog not found" });
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
    const comments = await Comment.find()
      .populate("blog", "title-_id")
      .populate("author", "name-_id");

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      body: comment.body,
      author: comment.author.name,
      blogTitle: comment.blog.title,
      createDate: comment.createDate,
    }));
    res.status(200).json(formattedComments);
  } catch (error) {
    next(error);
  }
}

// Read action (get comment by ID)
async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id)
      .populate("blog")
      .populate("author", "name");

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const formattedComments = {
      _id: comment._id,
      body: comment.body,
      author: comment.author.name,
      blogTitle: comment.blog.title,
      createDate: comment.createDate,
    };

    res.status(200).json(formattedComments);
  } catch (error) {
    next(error);
  }
}

// Update action
async function update(req, res, next) {
  try {
    const { body } = req.body;

    if (body && !body.trim()) {
      return res.status(400).json({ error: "Body cannot be empty." });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { body },
      { new: true, runValidators: true }
    )
      .populate("blog")
      .populate("author", "name");

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

// Get comments by Blog ID
async function getByBlogId(req, res, next) {
  try {
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comments = await Comment.find({ blog: blogId })
      .populate("author", "name")
      .populate("blog", "title-_id");

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      body: comment.body,
      author: comment.author.name,
      createDate: comment.createDate,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    next(error);
  }
}

async function getCommentByPersonAndBlog(req, res, next) {
  try {
    const { personId, blogId } = req.params;

    const comments = await Comment.find({ author: personId, blog: blogId })
      .populate({
        path: 'author',
        populate: {
          path: 'blogs',
          model: 'blog'
        }
      })
      .populate({
        path: 'blog',
        select: 'title'
      });

    if (!comments.length) {
      return res.status(404).json({ message: 'No comments found' });
    }

    const formattedComments = comments.map(comment => ({
      _id: comment._id,
      body: comment.body,
      author: comment.author.name,
      blogTitle: comment.blog.title,
      createDate: comment.createDate,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error('Error fetching comments by person and blog:', error);
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getByBlogId,
  getCommentByPersonAndBlog
};
