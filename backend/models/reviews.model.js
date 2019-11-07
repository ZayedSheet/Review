
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;