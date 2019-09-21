const tempModel = require('../model/temp');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("HELLO THERE");
});

router.post('/', (req, res) => {
    res.send("temp = " + req.body.temp);
    // var temp = new tempModel({
    //     temp: req.body.temp
    // });

    // temp.save((err, docs) => {
    //     if (!err) {
    //         res.send(req.body.temp);
    //     } else {
    //         res.send("ERROR IN SAVING TEMP");
    //     }
    // });
});


module.exports = router;