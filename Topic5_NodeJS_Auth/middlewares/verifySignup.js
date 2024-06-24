const createHttpError = require("http-errors");
const db = require("../models");

const {user: User, role: Role} = db;

async function checkExistUser(req, res, next){
    try {
        const email = req.body.email;
        if(!email)
            throw createHttpError.BadRequest("Email is required");
            // return res.status(400).json({message: "Email is required"});
        if(await User.findOne({email: email}))
            throw createHttpError.BadRequest(`${email} already exist.`);
        next();
    } catch (error) {
        next(error);
    }
}

async function checkRoles(req, res, next){
    try {
        if(req.body.roles){
            let rolesObject = await Role.find();
            let ROLES = [];
            rolesObject.map(r => ROLES.push(r.name));
            for(let i=0; i< req.body.roles.length; i++){
                if(!ROLES.includes(req.body.roles[i]))
                    throw createHttpError.BadRequest(`Role '${req.body.roles[i]}' does not exist`);
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

const verifySignup = {
    checkExistUser,
    checkRoles
}

module.exports = verifySignup;
