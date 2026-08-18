const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
const healthRoutes = require("./routes/health.routes");
app.use("/api", healthRoutes);
const farmerRoutes = require("./routes/farmer.routes");
app.use("/api/farmers", farmerRoutes);
const cropRoutes = require("./routes/crop.routes");
app.use("/api/crops", cropRoutes);

app.get("/", (req, res) => {
    res.json({tree /F
        message: "AgriChain AI Backend is running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});