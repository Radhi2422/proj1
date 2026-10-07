const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend server is working!"
    });
});

// Health check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Backend is healthy",
        timestamp: new Date().toISOString()
    });
});

// Sample API
app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Radhika",
            role: "Software Engineer"
        },
        {
            id: 2,
            name: "John",
            role: "Backend Developer"
        }
    ];

    res.json(users);
});

// POST API test
app.post("/api/users", (req, res) => {
    const { name, role } = req.body;

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
            name,
            role
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});