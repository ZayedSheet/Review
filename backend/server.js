const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');

app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



















// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const PORT = 4000;
// app.use(cors());
// app.use(bodyParser.json());
//
// app.get('/', (req,res) => res.send('Hello World!'));
//
// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
//
// });
//
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://buszowid:1Ho77mFPmQAJ@review-92jvc.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     const collection = client.db("Review").collection("Reviews");
//     collection.find().toArray((error,results) => {
//         if (error) console.log(error);
//         console.log(results);
//     })
// });