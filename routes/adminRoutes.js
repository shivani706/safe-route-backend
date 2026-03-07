const express = require("express");
const router = express.Router();

const SOS = require("../models/SOS");
const UnsafeZone = require("../models/UnsafeZone");


// GET ALL SOS ALERTS
router.get("/sos-alerts", async (req, res) => {

    try {

        const alerts = await SOS.find().sort({ createdAt: -1 });

        res.json(alerts);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET ALL UNSAFE ZONES
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


// GET TOP DANGEROUS ZONES
router.get("/danger-zones", async (req, res) => {

    try {

        const zones = await UnsafeZone.find()
            .sort({ alertCount: -1 })
            .limit(10);

        res.json(zones);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;