const tempModel = require('../model/temp');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("HELLO THERE Temp");
});

router.post('/', (req, res) => {
    console.log("DATA RECIEVED TEMP : " + req.body.temp);
    var temperature = new tempModel({
        temp: req.body.temp
    });

    temperature.save((err, docs) => {
        if (!err) {
            res.send("successfull");
        } else {
            res.send("ERROR IN SAVING TEMP");
        }
    });
});


module.exports = router;