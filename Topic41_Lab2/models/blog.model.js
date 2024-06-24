const mongoose = require("mongoose");
const {Schema} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: 20
    },
    body: String,
    comments: [
        {
            body: String,
            createDate: Date
        }
    ],
    meta: {
        votes: Number,
        favs: Number
    }
},{
    timestamps: true
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;