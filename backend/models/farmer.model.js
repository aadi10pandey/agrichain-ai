const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String,
            required: true
        },
        landArea: {
            type: Number,
            required: true
        },
        soilType: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Farmer", farmerSchema);