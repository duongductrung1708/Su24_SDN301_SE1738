const db = require("../models");
const Blog = db.blog;

// Create action
async function create(req, res, next) {
  try {
    const { title, body, meta, category } = req.body;

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
    const { title, body, meta, category } = req.body;

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
        $set: { title, body, meta, category },
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
    const blogs = await Blog.find({}).populate("category");

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
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

// Search by ID action
async function searchById(req, res, next) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("category");

    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const formattedBlog = {
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    };

    res.status(200).json(formattedBlog);
  } catch (error) {
    next(error);
  }
}

// Search by Name action
async function searchByName(req, res, next) {
  try {
    const { name } = req.params;
    const blogs = await Blog.find({ title: new RegExp(name, "i") }).populate(
      "category"
    );

    if (!blogs.length) {
      return res.status(404).json({ error: "No blogs found." });
    }

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
}

// Search by Category ID action
async function searchByCategoryId(req, res, next) {
  try {
    const { categoryId } = req.params;
    const blogs = await Blog.find({ category: categoryId }).populate(
      "category"
    );

    if (!blogs.length) {
      return res
        .status(404)
        .json({ error: "No blogs found for this category." });
    }

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
}

// Search by Votes Range action
async function searchByVotesRange(req, res, next) {
  try {
    const { minVotes, maxVotes } = req.query;

    const blogs = await Blog.find({
      "meta.votes": { $gte: minVotes, $lte: maxVotes },
    }).populate("category");

    if (!blogs.length) {
      return res
        .status(404)
        .json({ error: "No blogs found for the specified votes range." });
    }

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
}

// Search by Favs Range action
async function searchByFavsRange(req, res, next) {
  try {
    const { minFavs, maxFavs } = req.query;

    const blogs = await Blog.find({
      "meta.favs": { $gte: Number(minFavs), $lte: Number(maxFavs) },
    }).populate("category");

    if (!blogs.length) {
      return res
        .status(404)
        .json({ error: "No blogs found for the specified favs range." });
    }

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
}

// Search by Votes and Favs Range action
async function searchByVotesAndFavsRange(req, res, next) {
  try {
    const { minVotes, maxVotes, minFavs, maxFavs } = req.query;

    const blogs = await Blog.find({
      "meta.votes": { $gte: minVotes, $lte: maxVotes },
      "meta.favs": { $gte: minFavs, $lte: maxFavs },
    }).populate("category");

    if (!blogs.length) {
      return res
        .status(404)
        .json({ error: "No blogs found for the specified votes and favs range." });
    }

    const formattedBlogs = blogs.map((blog) => ({
      Id: blog._id,
      Title: blog.title,
      Body: blog.body,
      Votes: blog.meta.votes,
      Favs: blog.meta.favs,
      Category: blog.category.name,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  edit,
  list,
  remove,
  searchById,
  searchByName,
  searchByCategoryId,
  searchByVotesRange,
  searchByFavsRange,
  searchByVotesAndFavsRange,
};
