'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const projectHistory = [];

/* Middleware*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('website'));

// ROUTES
app.get('/getData', (req, res) => {
    const latestEntry = projectHistory[projectHistory.length - 1] || {};
    res.json(latestEntry);
});

app.post('/addData', (req, res) => {
    const { temp, date, content, zip, name, description } = req.body ?? {};

    if ([temp, date, zip, name, description].some(field => typeof field === 'undefined')) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEntry = {
        zip: zip,
        name: name,
        description: description,
        temp: temp,
        date: date,
        content: content ?? ''
    };

    projectHistory.push(newEntry);
    return res.status(201).json(newEntry);
});

app.get('/history', (req, res) => {
    res.json(projectHistory);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;