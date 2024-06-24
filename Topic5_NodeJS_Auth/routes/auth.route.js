const express = require("express");
const bodyParser = require("body-parser");
const authController = require("../controllers/auth.controller");
const verifySignup = require("../middlewares/verifySignup");

const authRouter = express.Router();
authRouter.use(bodyParser.json());

authRouter.post("/signup", [verifySignup.checkExistUser, verifySignup.checkRoles], authController.signUp);

module.exports = authRouter;