const router = require('express').Router();
let Poi = require('../models/poi.model'); 

router.route('/').get((req, res) => {
    Poi.find() // method to get a list for all from the db
    .then(pois => res.json(pois)) // return on json format
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:country').get(function(req, res){
    Poi.find({country:req.params.country}) // method to get a list for all from the db
    .then(pois => res.json(pois)) // return on json format
    .catch(err => res.status(400).json('Error: ' + err));

});


// router.route('/:id').get((req, res) => {
//     Poi.findById(req.params.id)
//     .then(poi => res.json(poi))
//     .catch(err => res.status(400).json('Error: '+err));
// });

module.exports = router;