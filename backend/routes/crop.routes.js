const express = require("express");

const router = express.Router();

router.post("/recommend", (req, res) => {
    const {
        soilType,
        temperature,
        rainfall,
        humidity,
        season
    } = req.body;

    if (!soilType || temperature === undefined || rainfall === undefined) {
        return res.status(400).json({
            success: false,
            message: "soilType, temperature and rainfall are required"
        });
    }

    let recommendations = [];

    if (
        soilType.toLowerCase() === "loamy" &&
        temperature >= 20 &&
        temperature <= 30 &&
        rainfall >= 50 &&
        rainfall <= 150
    ) {
        recommendations.push({
            crop: "Wheat",
            suitability: "High",
            reason: "Suitable soil, temperature and rainfall conditions."
        });
    }

    if (
        soilType.toLowerCase() === "clayey" &&
        temperature >= 20 &&
        temperature <= 35 &&
        rainfall >= 100
    ) {
        recommendations.push({
            crop: "Rice",
            suitability: "High",
            reason: "Clayey soil and higher rainfall are favorable for rice."
        });
    }

    if (
        soilType.toLowerCase() === "loamy" &&
        temperature >= 18 &&
        temperature <= 32 &&
        rainfall >= 40
    ) {
        recommendations.push({
            crop: "Maize",
            suitability: "High",
            reason: "Maize performs well in moderate temperatures and loamy soil."
        });
    }

    if (
        soilType.toLowerCase() === "sandy" &&
        temperature >= 25 &&
        temperature <= 35
    ) {
        recommendations.push({
            crop: "Groundnut",
            suitability: "High",
            reason: "Groundnut is well suited to warmer conditions and sandy soil."
        });
    }

    if (recommendations.length === 0) {
        recommendations.push({
            crop: "Millets",
            suitability: "Moderate",
            reason: "Millets are relatively adaptable to different soil and climate conditions."
        });
    }

    res.json({
        success: true,
        input: {
            soilType,
            temperature,
            rainfall,
            humidity,
            season
        },
        recommendations
    });
});

module.exports = router;