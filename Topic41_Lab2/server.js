const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const httpErrors = require("http-errors");
const db = require("./models");
const { PersonRouter, BlogRouter, CategoryRouter, CommentRouter } = require("./routes");

require("dotenv").config();

// Khoi tao Express web server
const app = express();
// Bo sung cac middlewares kiem soat hoat dong tren Express web server
app.use(bodyParser.json());
app.use(morgan("dev"));

// Dinh tuyen co ban ve web root
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to RESTFul API Web services - NodeJS' });
});

app.use("/person", PersonRouter);
app.use("/blog", BlogRouter);
app.use("/category", CategoryRouter);
app.use("/comment", CommentRouter);


// Kiem soat cac loi cua Request va Response
app.use(async (req, res, next) => {
    next(httpErrors.NotFound());
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

// Lang nghe cac request tu Client app(s)
app.listen(process.env.PORT, process.env.HOST_NAME, () =>{
    console.log(`Server is running at: ${process.env.HOST_NAME}:${process.env.PORT}`);
    db.connectDB();
})
