/**
 * Setup file for web page page backend
 * Run `nodemon server` to start server locally
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const fs = require('fs');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connects backend server to mongoDB server
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//API routes for each mongodb collection
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');
const objectsRouter = require('./routes/objects');
const signinRouter = require('./routes/signin');

//Enables usage of api routes in the backend
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);
app.use('/objects', objectsRouter);
app.use('/signin', signinRouter);

app.use(express.static("../frontend/build"));
app.get("*", (req,res) => {
   res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});