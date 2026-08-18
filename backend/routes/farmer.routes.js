const express = require("express");
const Farmer = require("../models/farmer.model");

const router = express.Router();

// Create farmer
router.post("/", async (req, res) => {
    try {
        const farmer = await Farmer.create(req.body);

        res.status(201).json({
            success: true,
            message: "Farmer created successfully",
            farmer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get all farmers
router.get("/", async (req, res) => {
    try {
        const farmers = await Farmer.find();

        res.json({
            success: true,
            farmers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;