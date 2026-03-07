const mongoose = require("mongoose");

const unsafeZoneSchema = new mongoose.Schema({

    latitude: Number,
    longitude: Number,

    alertCount: {
        type: Number,
        default: 1
    },

    status: {
        type: String,
        default: "active"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("UnsafeZone", unsafeZoneSchema);