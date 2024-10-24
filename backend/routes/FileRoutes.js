const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/file', (req, res) => {
    const fileName = req.query.filename;
    const filePath = path.join(__dirname, '../uploads/', fileName);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ content: data });
    });
});

router.get('/download', (req, res) => {
    const fileName = req.query.file;
    const filePath = '../uploads/' + fileName;
    
    res.sendFile(path.resolve(filePath));
});

module.exports = router;