const mongoose = require("mongoose");
const User = require('./user.model');
const Role = require("./role.model");

// Chi dinh module 'mongoose' su dung toan cuc tren du an
mongoose.Promise = global.Promise;

// Khai bao doi tuong db
const db = {};

// Them cac thuoc tinh cho DB
db.user = User;
db.role = Role;
db.ROLES = ["member", "mod", "admin"];

db.connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
    .then(() => console.log("Connect to MongoDB success."))
    .catch(error => console.error(error.message));
}

module.exports = db;