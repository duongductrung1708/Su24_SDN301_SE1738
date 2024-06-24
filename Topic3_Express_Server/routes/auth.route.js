const express = require("express");
const bodyParser = require("body-parser");

const authRouter = express.Router();
authRouter.use(bodyParser.json()); // Kiem soat kieu du lieu cua body cho router nay

// Register
authRouter.post('/register', (req, res, next)=>{
    res.status(200).json({
        "email": req.body.email,
        "fullname": req.body.fName + " " + req.body.lName
    });
});

authRouter.get("/info/:id", (req, res, next)=>{
    res.status(200).json({
        "employeeId" : req.params.id 
    });
});

module.exports = authRouter;