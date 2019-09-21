const mongoose = require('mongoose');
const Temp = new mongoose.model('Temp', {
    temp: {
        type: String
    }
});

module.exports = Temp;