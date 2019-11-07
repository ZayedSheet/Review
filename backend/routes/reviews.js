const router = require('express').Router();
let Reviews = require('../models/reviews.model');

router.route('/').get((req, res) => {
    Reviews.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Returns a review given the id
router.route('/:id').get((req, res) => {
    Reviews.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newReviews = new Reviews({
        username,
        description,
        date,
    });

    newReviews.save()
        .then(() => res.json('Review added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Deletes a review given the id
router.route('/:id').delete((req, res) => {
    Reviews.findByIdAndDelete(req.params.id)
        .then(() => res.json('Review deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Reviews.findById(req.params.id)
        .then(reviews => {
            reviews.username = req.body.username;
            reviews.description = req.body.description;
            reviews.date = Date.parse(req.body.date);

            reviews.save()
                .then(() => res.json('Review updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;