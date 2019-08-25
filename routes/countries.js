const router = require('express').Router();
let Country = require('../models/country.model'); 

router.route('/').get((req, res) => {
    Country.find() // method to get a list for all the users from the db
    .then(countries => res.json(countries)) // return on json format
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const countryName = req.body.countryName;
    const capital = req.body.capital;
    const countryCode = req.body.countryCode;
    // Number(req.body.duration) for a number
    // Date.parse(req.body.date) for a date

    const newCountry = new Country({
        username,
        countryName,
        capital,
        countryCode,
    });

    newCountry.save()
    .then(() => res.json('Country added!'))
    .catch(err => res.status(400).json('Error: ' + err));  
});

router.route('/:id').get((req, res) => {
    Country.findById(req.params.id)
    .then(country => res.json(country))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) => {
    Country.findByIdAndDelete(req.params.id)
    .then(() => res.json('Country deleted'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
    Country.findById(req.params.id)
    .then(country => {
        country.username = req.body.username;
        country.countryName = req.body.countryName;
        country.capital = req.body.capital;
        country.countryCode = req.body.countryCode;
        
        country.save()
            .then(() => res.json('Country updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;