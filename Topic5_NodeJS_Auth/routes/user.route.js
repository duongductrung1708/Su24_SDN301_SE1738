const express = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/user.controller");
const verifyAuth = require("../middlewares/verifyAuth");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post("/create", userController.create);

userRouter.get("/all", [verifyAuth.verifyJwt], userController.allAccess);

userRouter.get("/member", [verifyAuth.verifyJwt], userController.memberAccess);

userRouter.get("/mod", [verifyAuth.verifyJwt, verifyAuth.isModerator], userController.modAccess);

userRouter.get("/admin", [verifyAuth.verifyJwt, verifyAuth.isAdministrator], userController.adminAccess);

module.exports = userRouter;
