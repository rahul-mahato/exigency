require('./db');
const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const locationController = require('./controller/LocationController');

const app = express();
app.use(bodyParser.json());

app.use('/', locationController);

app.listen(port, () => {
    console.log("LISTENING AT PORT " + port)
});