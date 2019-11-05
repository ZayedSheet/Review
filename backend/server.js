const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => res.send('Hello World!'));

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);

});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://buszowid:1Ho77mFPmQAJ@review-92jvc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    const collection = client.db("Review").collection("Reviews");
    console.log(collection.find());
});