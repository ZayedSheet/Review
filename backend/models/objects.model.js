const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectsSchema = new Schema({
    name: {type: String, required: true, unique: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    overview: {type:String},
    coordinates: {type: String},
    username: {type: String}
});

const Objects = mongoose.model('Object', objectsSchema);
module.exports = Objects;