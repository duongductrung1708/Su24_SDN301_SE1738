const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.route');

require('dotenv').config();

const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;

// Khoi tao 1 express web server
const app = express();

// Bo sung middlewares vao express server
app.use(morgan('dev'));
app.use(bodyParser.json());

// Root router
app.get('/api', (req, res, next)=>{
    res.send("<html><body><h1>Welcome to Express server</h1></body></html>");
});

// Dinh tuyen cac request truc tiep tu Express server
app.get('/api/employee', (req, res, next)=>{
    res.send("<html><body><h1>List of Employees</h1></body></html>")
});

app.post("/api/employee/create", (req, res, next)=>{
    res.status(201).json(req.body);
});

app.use('/api/auth', authRouter);

// Kich hoat express cho phep lang nghe cac request tu Client
app.listen(PORT, HOST_NAME, ()=>{
    console.log(`Server is running at: http://${HOST_NAME}:${PORT}`);
});