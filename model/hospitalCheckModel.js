const mongoose = require('mongoose');

const hospitalModel = mongoose.model("hospital", {
    hname: { type: String },
    phoneNumber: { type: String }
})

module.exports = hospitalModel;