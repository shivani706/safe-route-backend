const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    latitude: Number,
    longitude: Number,

    message: {
        type: String,
        default: "User reported unsafe route"
    },

    status: {
        type: String,
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("SOS", sosSchema);