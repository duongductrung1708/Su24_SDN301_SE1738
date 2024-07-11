const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const httpErrors = require("http-errors");
const cors = require("cors");
const db = require("./models");
const { ProjectRouter, EmployeeRouter, DepartmentRouter } = require("./routes");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to RESTFul API Web services - NodeJS" });
});

app.use("/projects", ProjectRouter);
app.use("/employees", EmployeeRouter);
app.use("/departments", DepartmentRouter);

app.use(async (req, res, next) => {
  next(httpErrors.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server is running at: ${process.env.HOST_NAME}:${process.env.PORT}`
  );
  db.connectDB();
});
