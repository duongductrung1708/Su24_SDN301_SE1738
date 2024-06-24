const express = require("express");
const bodyParser = require("body-parser");
const { UserController } = require("../controllers");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post("/create", UserController.create);

module.exports = userRouter;