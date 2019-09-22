const LocationModel = require('../model/LocationModel');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    LocationModel.find((err, docs) => {
        res.json(docs);
    })
});

router.post('/', (req, res) => {

    var location = new LocationModel({
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    location.save((err, docs) => {
        if (!err) {
            res.send("successfully saved Location" + docs);

        } else {
            res.send("ERROR IN SAVING TEMP");
        }
    });
});


module.exports = router;