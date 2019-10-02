const LocationModel = require('../model/LocationModel');
const http = require('https');
const express = require('express');
const hospitalModel = require('../model/hospitalCheckModel');
const router = express.Router();
const GoogleMapsAPI = require('googlemaps');
const request = require('sync-request');



// send message 

function sendText(hospital, cord) {

    mobile1 = "9078292231";
    mobile2 = "7438805030";
    mobile3 = "7749803313";
    messages = `hey hospital ${hospital.hname} user xyz have been into an accident in latitude ${cord.latitude} and longitude ${cord.longitude} 
    MAP - https://www.google.com/maps/search/?api=1&query=${cord.latitude},${cord.longitude}`;

    var options = {
        "method": "POST",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/v2/sendsms?country=91",
        "headers": {
            "authkey": "296784AyfzuoCOc5d941e13",
            "content-type": "application/json"
        }
    };

    var req = http.request(options, function(res) {
        var chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function() {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.write(JSON.stringify({
        sender: 'EXIAID',
        route: '4',
        country: '91',
        sms: [{ message: messages, to: [`${mobile1}`, `${mobile2}`, `${mobile3}`] }]
    }));
    req.end();
}


router.get('/', (req, res) => {
    LocationModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    })
});

router.get('/hospitals', (req, res) => {
    hospitalModel.find((err, doc) => {
        res.send(doc);
    })
})



router.post('/', (req, res) => {
    var phone_number, name, place_id;


    var location = new LocationModel({
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    location.save((err, docs) => {
        if (err) {
            res.send(JSON.stringify(err, undefined, 0));
        }
    })
    res.write("DATA POSTED SUCCESSFULLY : " + req.body.latitude + " , " + req.body.longitude + " <br>");

    latitude = req.body.latitude;
    longitude = req.body.longitude;
    // 85.82736819029014    20.338958274723307

    var i = 1;
    //searching for hospitals nearby
    while (!phone_number) {
        var hospitals = request('GET', `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&keyword=hospital&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk`);
        var data = JSON.parse(hospitals.getBody());
        // console.log(data);
        place_id = data.results[i].place_id;
        console.log("place_id = " + place_id);


        var Details = request('GET', `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,formatted_phone_number&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk`);
        var det = JSON.parse(Details.getBody());
        console.log(det);

        name = det.result.name;
        phone_number = det.result.formatted_phone_number;
        i += 1;

    }
    var hospital = new hospitalModel({
        hname: name,
        phoneNumber: phone_number

    });



    hospital.save((err, docs) => {

        res.end(JSON.stringify(docs));

    })

    setTimeout(() => {
        sendText(hospital, req.body);
    }, 2000);

    console.log("NAME = " + name);
    console.log("Phone = " + phone_number);
    res.end("MESSAGE SENT SUCCESSFULLY");





});

module.exports = router;