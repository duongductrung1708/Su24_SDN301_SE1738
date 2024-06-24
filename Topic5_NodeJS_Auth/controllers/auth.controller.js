const createHttpError = require("http-errors");
const db = require("../models");
const bcrypt = require("bcrypt");

const {user: User, role: Role} = db;

// SignUp action - Register a new or multi Users
async function signUp(req, res, next){
    try {
        const newUser = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
            dob: req.body.dob
        });

        if(req.body.roles){
            const roles = await Role.find({name: {$in: req.body.roles}}).exec();
            newUser.roles = roles.map(r => r._id);
            await User.create(newUser)
                .then(addedUser => res.status(201).json(addedUser));
        }else{
            const role = await Role.findOne({name: "member"}).exec();
            newUser.roles = [role._id];
            await User.create(newUser)
                .then(addedUser => res.status(201).json(addedUser));
        }
    } catch (error) {
        next(error);
    }
}

// SignIn action - Login to system -> return: User object includes: [accessToken, refreshToken]
async function signIn(req, res, next){
    try {
        
    } catch (error) {
        next(error);
    }
}

async function signOut(req, res, next){
    try {
        
    } catch (error) {
        next(error);
    }
}

async function refreshToken(req, res, next){
    try {
        
    } catch (error) {
        next(error);
    }
}

const authController = {
    signUp,
    signIn,
    signOut,
    refreshToken
}

module.exports = authController;
