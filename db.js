const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rocker785:rahul123@cluster0-1qspl.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("CONNECTION TO MONGO DB SUCCESSFUL");

    } else {
        console.log("Error in mongo connection  : " + JSON.stringify(err, undefined, 2));
    }
})

module.exports = mongoose;