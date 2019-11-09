const router = require('express').Router();
let Object = require('../models/objects.model');

router.route('/').get((req,res) => {
    Object.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

router.route('/add').post((req,res) =>{

    const name = req.body.name;
    const city = req.body.city;
    const country = req.body.country;
    const overview = req.body.overview;
    const coordinates = req.body.coordinates;

    const newObject = new Object({
        name,
        city,
        country,
        overview,
        coordinates
    });

    newObject.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

module.exports = router;

//TODO add full form validation