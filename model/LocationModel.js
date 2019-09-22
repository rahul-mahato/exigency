const mongoose = require('mongoose');
const LocationModel = new mongoose.model('Temp', {
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

module.exports = LocationModel;