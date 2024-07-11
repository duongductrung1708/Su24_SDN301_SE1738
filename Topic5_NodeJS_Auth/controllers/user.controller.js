const db = require("../models");
const User = db.user;

// Create a new user
async function create(req, res, next){
    try {
        // const newUser = new User({
        //     email: req.body.email,
        //     password: req.body.password,
        //     dob: req.body.dob,
        //     role: req.body.role
        // });
        // Save into DB
        // await newUser.save()
        //     .then(newDoc => res.status(201).json(newDoc));

        await User.create(req.body)
            .then(newDocs => res.status(201).json(newDocs));

    } catch (error) {
        next(error);
    }
}

async function allAccess(req, res, next) {
    res.send("All access");
}

async function memberAccess(req, res, next) {
    res.send("Member action access");
}

async function modAccess(req, res, next) {
    res.send("Mod action access");
}

async function adminAccess(req, res, next) {
    res.send("Admin action access");
}

const userController = {
    create,
    allAccess,
    memberAccess,
    modAccess,
    adminAccess,
};

module.exports = userController;