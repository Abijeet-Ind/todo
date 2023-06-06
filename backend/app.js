const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./route/userRoute');
const todoRouter = require('./route/todoRouter');

app.use(express.json({
    limit: '10kb'
}));

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', cors(corsOptions), todoRouter);


module.exports = app;