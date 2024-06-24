const db = require("../models");
const Blog = db.blog;

// Create action
async function create(req, res, next){
    try {
        const newBlog = new Blog({
            title: req.body.title,
            body: req.body.body,
            comments: req.body.comments,
            meta: req.body.meta
        });
        await newBlog.save()
            .then(newDoc => res.status(201).json(newDoc));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create
}