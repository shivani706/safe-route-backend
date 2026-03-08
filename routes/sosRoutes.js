const express = require("express");
const router = express.Router();

const SOS = require("../models/SOS");
const UnsafeZone = require("../models/UnsafeZone");   // ✅ Missing import


// SEND SOS
router.post("/send", async (req, res) => {

    try {

        const { userId, latitude, longitude } = req.body;

        const sos = new SOS({
            userId,
            latitude,
            longitude
        });

        await sos.save();

        // CHECK IF UNSAFE ZONE EXISTS
        const existingZone = await UnsafeZone.findOne({
            latitude,
            longitude
        });

        if (existingZone) {

            existingZone.alertCount += 1;
            await existingZone.save();

        } else {

            const zone = new UnsafeZone({
                latitude,
                longitude
            });

            await zone.save();

        }

        res.json({
            message: "SOS Alert Sent & Zone Updated"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET UNSAFE ZONES (For police / dashboard map)
router.get("/unsafe-zones", async (req, res) => {

    try {

        const zones = await UnsafeZone.find();

        res.json(zones);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;