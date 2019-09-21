require('./db');
const port = 3000 || process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/', (req, res) => {

    res.status(200);
    res.send("HELLO THERE ");
})

app.listen(port, () => {
    console.log("LISTENING AT PORT " + port)
});