const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/exigency_aid", { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("CONNECTION TO MONGO DB SUCCESSFUL");

    } else {
        console.log("Error in mongo connection");
    }
})

module.exports = mongoose;