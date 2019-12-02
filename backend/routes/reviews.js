/**
 * Endpoints for working with object reviews
 * @type {Router}
 */

const router = require('express').Router();
let Reviews = require('../models/reviews.model');
let Object = require('../models/objects.model');

/**
 * gets all review objects from server
 */
router.route('/').get((req, res) => {
    Reviews.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * gets the reviews associated to an object
 */
router.route('/find/byObjectName/:object_name').get((req, res) => {
    Reviews.find({object_name: req.params.object_name})
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Returns a review given the id of the review
 */
router.route('/:id').get((req, res) => {
    Reviews.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Adds a review based on the request body
 */
router.route('/add').post((req, res) => {

    //Retrieves required fields from request
    const username = req.body.username;
    const description = req.body.description;
    const title = req.body.title;
    const stars = req.body.stars;
    const object_name = req.body.object_name;


    // ******** Updating object review fields ********

    //Updates the average and number of ratings in the object collection
    console.log("reviews: updating object");
    Object.findOne({name: object_name}) //finds the object
        .then(object => {
            let numRatings = object.rating.one + object.rating.two + object.rating.three + object.rating.four + object.rating.five; //gets total number of ratings
            let curAverage = object.rating.average; //gets the average rating
            let newAverage = (curAverage * numRatings + stars)/(numRatings + 1);
            let newRating = "rating.zero";

            //Determines which rating field to increment based on the request stars
            switch(stars){
                case 1: newRating = "rating.one"; break;
                case 2: newRating = "rating.two"; break;
                case 3: newRating = "rating.three"; break;
                case 4: newRating = "rating.four"; break;
                case 5: newRating = "rating.five"; break;
            }

            //Updates the average and the number of ratings
            Object.findOneAndUpdate({name: object_name},
                {$inc: {[newRating]: 1}, $set: {"rating.average": newAverage}},
                (error,doc) => {if(error) console.log("ERROR"); console.log(doc)}
                );
        })
        .catch(err => res.status(400).json('Error: ' + err));


    // ******** Saving document (if validates) to db ********

    //Creates a new review document based on Review Schema
    const newReviews = new Reviews({username, title, description, stars, object_name});

    //Saves newReviews document to Object database
    newReviews.save()
        .then(() => res.json('Review added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

/**
 * Deletes a review given the id
 */
router.route('/:id').delete((req, res) => {
    Reviews.findByIdAndDelete(req.params.id)
        .then(() => res.json('Review deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Updates a review given the id
 */
router.route('/update/:id').post((req, res) => {
    Reviews.findById(req.params.id)
        .then(reviews => {
            // Replaces the fields in the review with the ones in the request
            reviews.username = req.body.username;
            reviews.description = req.body.description;
            reviews.date = Date.parse(req.body.date);

            // Saves new updated review
            reviews.save()
                .then(() => res.json('Review updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

//TODO add full form validation