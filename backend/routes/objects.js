/**
 * Routes
 * @type {Router}
 */

const router = require('express').Router();
let Object = require('../models/objects.model');

router.route('/').post((req,res) => {
    console.log(req.body);
    Object.find(req.body).sort({"rating.average" : -1})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
    }
);



router.route('/add').post((req,res) =>{
    console.log(req.body);
    const name = req.body.name;
    const city = req.body.city;
    const country = req.body.country;
    const overview = req.body.overview;
    const coordinates = req.body.coordinates;
    const username = req.body.username;
    const rating = {one: 0, two: 0, three: 0, four: 0, five: 0, average: 0};
    // console.log("coordinates ob", coordinates);

    //TODO

    if (!username){
        return res.send({
            success: false,
            message: 'username required'
        });
    }
    if(!country){
        return res.send({
            success: false,
            message: 'Country is not provided'
        });
    }
    if (!name || !name.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid name format'
        });
    }
    if (!city || !city.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid city format'
        });
    }
    if (!country || !country.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid name format or length'
        });
    }
    if (isNaN(coordinates.latitude) || isNaN(coordinates.longitude)){
        return res.send({
            success: false,
            message: 'coordinates needs to be a number'
        });
    }


    const newObject = new Object({
        name,
        city,
        country,
        overview,
        coordinates,
        username,
        rating
    });


    newObject.save()
        .then(() => res.json('Object Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

module.exports = router;
