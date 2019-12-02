//A model for each document in the reviews collection

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    username: { type: String, required: true}, //TODO make unique
    title: {type:String, required: true},
    description: { type: String, required: true },
    stars: {type: Number, required: true},
    object_name: {type: String, required: true}
}, {
    timestamps: true,
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;