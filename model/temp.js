const mongoose = require('mongoose');
const tempModel = new mongoose.model('Temp', {
    temp: {
        type: String
    }
});

module.exports = tempModel;