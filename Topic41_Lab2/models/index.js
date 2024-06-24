const mongoose = require("mongoose");
const Person = require("./person.model");
const Blog = require("./blog.model");

// Chi dinh module 'mongoose' su dung toan cuc tren du an
mongoose.Promise = global.Promise;

// Khai bao doi tuong db
const db = {};
// Them cac thuoc tinh cho DB
db.person = Person;
db.blog = Blog;

db.connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
    .then(() => console.log("Connect to MongoDB success."))
    .catch(error => console.error(error.message));
}

module.exports = db;