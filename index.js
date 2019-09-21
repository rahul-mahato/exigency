require('./db');
const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const TempController = require('./controller/tempController');

const app = express();
app.use(bodyParser.json());

app.use('/', TempController);

app.listen(port, () => {
    console.log("LISTENING AT PORT " + port)
});