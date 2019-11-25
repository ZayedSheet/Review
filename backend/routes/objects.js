const router = require('express').Router();
let Object = require('../models/objects.model');

router.route('/').post((req,res) => {
    console.log(req.body);
    Object.find(req.body)
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

    if (!username)
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
        username
    });

    if(!country){
        return res.send({
            success: false,
            message: 'Country is not provided'
        });
    }

    newObject.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

module.exports = router;

//TODO add full form validation