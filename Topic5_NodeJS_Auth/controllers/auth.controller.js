const createHttpError = require("http-errors");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const { user: User, role: Role } = db;

// SignUp action - Register a new or multi Users
async function signUp(req, res, next) {
  try {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.PASSWORD_KEY)
      ),
      dob: req.body.dob,
    });

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } }).exec();
      newUser.roles = roles.map((r) => r._id);
      await User.create(newUser).then((addedUser) =>
        res.status(201).json(addedUser)
      );
    } else {
      const role = await Role.findOne({ name: "member" }).exec();
      newUser.roles = [role._id];
      await User.create(newUser).then((addedUser) =>
        res.status(201).json(addedUser)
      );
    }
  } catch (error) {
    next(error);
  }
}

// SignIn action - Login to system -> return: User object includes: [accessToken, refreshToken]
async function signIn(req, res, next) {
  try {
    const existUser = await User.findOne({ email: req.body.email })
      .populate("roles", "-_v")
      .exec();
    if (!req.body.email || !req.body.password)
      throw createHttpError.BadRequest("Email and password are required.");
    if (!existUser) throw createHttpError.BadRequest("Email does not exist.");

    const isMatchPassword = bcrypt.compareSync(
      req.body.password,
      existUser.password
    );
    if (!isMatchPassword)
      throw createHttpError.BadRequest("Password is incorrect.");

    const token = jwt.sign({ id: existUser._id }, config.secret, {
      algorithm: "HS256",
      expiresIn: config.jwtExpiration,
    });

    const authorities = [];
    for(let i = 0; i < existUser.roles.length; i++){
        authorities.push("ROLE_"+existUser.roles[i].name.toUpperCase());
    }

    res.status(200).json({
      id: existUser._id,
      email: existUser.email,
      accessToken: token,
      authorities: authorities
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

const authController = {
  signUp,
  signIn,
  signOut,
  refreshToken,
};

module.exports = authController;
