const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectsSchema = new Schema({
    name: {type: String, required: true, unique: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    overview: {type: String, required: true},
    username: {type: String, required: true},
    coordinates: {
            latitude: {type: Number, required: true},
            longitude: {type: Number, required: true}
    }
});

objectsSchema.index({name: 'text', city: 'text', country: 'text', overview: 'text'});

const Objects = mongoose.model('Object', objectsSchema);
module.exports = Objects;