require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}


const DB_URI = "mongodb+srv://merika:MmEeRrIiKkAa2233@cluster0.byrvhy3.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewURLParser: true
})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err))

//All router Imports
const authRouter = require('./routes/auth');
const adRouter = require('./routes/ad');
const categoryRouter = require('./routes/category');
const { JsonWebTokenError } = require('jsonwebtoken');
const app = express();

//Middleware usage
app.use(express.static('public'))
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));

//Router Related Usage
app.use('/auth', authRouter);
app.use(authenticateRequest);

app.use('/category', categoryRouter);
app.use('/ad', adRouter);
app.listen(8000);

function authenticateRequest(req, res, next) {
    const authHeaderInfo = req.headers["authorization"];

    if (authHeaderInfo === undefined) {
        return res.status(401).send("No token was provided");
    }
    const token = authHeaderInfo.split(" ")[1];
    if (token === undefined) {
        return res.status(401).send("Proper token was not provided");
    }
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userInfo = payload;
        next();
    }
    catch (e) {
        res.status(401).send("Invalid token provided" + e.message);
    }
}