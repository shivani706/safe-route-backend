const User = require("../models/User");
const generateTouristID = require("../utils/generateTouristID");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { id, hash } = generateTouristID();

        const user = new User({
            name,
            email,
            password, // we will hash later
            touristID: id,
            touristHash: hash
        });

        await user.save();

        res.json({
            message: "User Registered",
            touristID: id,
            touristHash: hash
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};