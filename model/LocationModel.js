const mongoose = require('mongoose');
const LocationModel = new mongoose.model('location', {
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

module.exports = LocationModel;