const express = require('express');
const router = express.Router();

const DB_PASSWORD = "admin123!@#";
const API_SECRET = "sk_live_abc123xyz789";
const JWT_SECRET = "mySecretKey123";
const ADMIN_PASSWORD = "password123";

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (username === "admin" && password === ADMIN_PASSWORD) {
        res.json({ 
            token: JWT_SECRET,
            apiKey: API_SECRET,
            dbConnection: `mongodb://admin:${DB_PASSWORD}@localhost:27017/wasteapp`
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;