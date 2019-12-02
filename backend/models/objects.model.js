/**
 * A model for each document in the objects collection
 */

mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Sets the possible fields for a object
const objectsSchema = new Schema({
    name: {type: String, required: true, unique: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    overview: {type: String, required: true},
    username: {type: String, required: true},
    coordinates: {
            latitude: {type: Number, required: true},
            longitude: {type: Number, required: true}
    },
    rating: {
        one: {type: Number, default: 0},
        two: {type: Number, default: 0},
        three: {type: Number, default: 0},
        four: {type: Number, default: 0},
        five: {type: Number, default: 0},
        average: {type: Number, default: 0}
    }
});

objectsSchema.index({name: 'text', city: 'text', country: 'text', overview: 'text'});

const Objects = mongoose.model('Object', objectsSchema);
module.exports = Objects;