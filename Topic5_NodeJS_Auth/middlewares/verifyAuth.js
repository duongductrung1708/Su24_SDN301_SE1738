const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const { request } = require("express");
const createHttpError = require("http-errors");
const { user: User, role: Role } = db;

async function verifyJwt(req, res, next) {
  try {
    const requestToken = req.headers("x-access-token");
    if (!requestToken) throw createHttpError.Unauthorized("Token is required");
    jwt.verify(requestToken, config.secret, (err, decode) => {
      if (err) {
        const message =
          err instanceof TokenExpiredError ? "JWT expired time" : err.message;
        throw createHttpError.Unauthorized(message);
      }
      req.userId = decode.id;
      next();
    });
  } catch (err) {
    next(err);
  }
}

async function isModerator(req, res, next) {
  try {
    const existUser = await User.findById(req.userId).populate("roles").exec();
    if (!existUser) throw createHttpError.Forbidden("Forbidden access");

    for (let i = 0; i < existUser.roles.length; i++) {
      if (existUser.roles[i].name === "mod") next();
      return;
    }
    throw createHttpError.Forbidden("Role moderator is required");
  } catch (err) {
    next(err);
  }
}

async function isAdministrator(req, res, next) {
  try {
    const existUser = await User.findById(req.userId).populate("roles").exec();
    if (!existUser) throw createHttpError.Forbidden("Forbidden access");

    for (let i = 0; i < existUser.roles.length; i++) {
      if (existUser.roles[i].name === "admin") next();
      return;
    }
    throw createHttpError.Forbidden("Role administrator is required");
  } catch (err) {
    next(err);
  }
}

const verifyAuth = {
  verifyJwt,
  isModerator,
  isAdministrator,
};

module.exports = verifyAuth;
