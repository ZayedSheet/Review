/**
 * Endpoints for working with
 * @type {Router}
 */

const router = require('express').Router();
let Object = require('../models/objects.model');

// Importing AWSPresigner
const {generatePutUrl} = require('../AWSPresigner');
/**
 * Find documents in objects collection based on given request body
 */
router.route('/').post((req,res) => {
    console.log(req.body);
    Object.find(req.body).sort({"rating.average" : -1}) //Sorts results by rating (descending)
        .then(objects => res.json(objects)) //If find successful
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

/**
 * Adds to objects collection based on given request body
 */
router.route('/add').post((req,res) =>{
    console.log(req.body);

    //Retrieves required fields from request
    const name = req.body.name;
    const city = req.body.city;
    const country = req.body.country;
    const overview = req.body.overview;
    const coordinates = req.body.coordinates;
    const username = req.body.username;


    // ******** Backend Validation for adding an object ********

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
    //Names cannot begin or end with whitespace. Only one whitespace is allowed between strings
    if (!name || !name.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid name format'
        });
    }
    //City cannot begin or end with whitespace. Only one whitespace is allowed between strings
    if (!city || !city.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid city format'
        });
    }
    //Country cannot begin or end with whitespace. Only one whitespace is allowed between strings
    if (!country || !country.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid name format or length'
        });
    }
    //Coordinates must be a number
    if (isNaN(coordinates.latitude) || isNaN(coordinates.longitude)){
        return res.send({
            success: false,
            message: 'coordinates needs to be a number'
        });
    }

    // ******** Saving document (if validates) to db ********

    //Creates a new object document based on Object Schema
    const newObject = new Object({name, city, country, overview, coordinates, username,});

    //Saves newObject document to Object database
    newObject.save()
        .then(() => {
            generatePutUrl(name + '/cover.png')
                .then(putURL => {res.send({putURL});})
                .catch(err => {res.send(err);});
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

module.exports = router;
