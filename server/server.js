const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'brews.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper: load brews from file
const loadBrews = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return raw ? JSON.parse(raw) : [];
};

// Helper: save brews to file
const saveBrews = (brews) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(brews, null, 2), 'utf-8');
};

// GET /brews → return all brews
app.get('/brews', (req, res) => {
    const brews = loadBrews();
    res.json(brews);
});

// POST /brews → save new brew
app.post('/brews', (req, res) => {
    const newBrew = req.body;

    if (
        typeof newBrew.coffeeWeight !== 'number' ||
        typeof newBrew.brewTime !== 'number' ||
        typeof newBrew.yieldWeight !== 'number' ||
        typeof newBrew.notes !== 'string'
    ) {
        return res.status(400).json({ error: 'Invalid brew format' });
    }

    // Add timestamp
    const brewWithTimestamp = {
        ...newBrew,
        timestamp: new Date().toISOString(),
    };

    const brews = loadBrews();
    brews.push(brewWithTimestamp);
    saveBrews(brews);

    console.log('Saved brew:', brewWithTimestamp);
    res.status(201).json({ message: 'Brew saved' });
});

// DELETE /brews → remove unwanted brews
app.delete('/brews/:timestamp', (req, res) => {
    const { timestamp } = req.params;
    const brews = loadBrews();

    const updatedBrews = brews.filter(brew => brew.timestamp !== timestamp);

    if ( updatedBrews.length === brews.length ) {
        return res.status(404).json({ error: 'No brews found' });
    }

    saveBrews(updatedBrews);
    res.json({ message: 'Brew deleted' });
})

// Start server
app.listen(PORT, () => {
    console.log(`☕ Brew backend running at http://localhost:${PORT}`);
});
