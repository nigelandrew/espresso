const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'brews.json');

const coffeeTypesPath = path.join(__dirname, 'coffee-types.json');
const roastersPath = path.join(__dirname, 'roasters.json');

const loadCoffeeTypes = () => {
    if (!fs.existsSync(coffeeTypesPath)) return [];
    const data = fs.readFileSync(coffeeTypesPath);
    return JSON.parse(data);
};

const loadRoasters = () => {
  if (!fs.existsSync(roastersPath)) return [];
  const data = fs.readFileSync(roastersPath);
  return JSON.parse(data);
};

const saveCoffeeTypes = (coffeeTypes) => {
    fs.writeFileSync(coffeeTypesPath, JSON.stringify(coffeeTypes, null, 2));
};

const saveRoasters = (roasters) => {
    fs.writeFileSync(roastersPath, JSON.stringify(roasters, null, 2));
};

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

app.get('/coffee-types', (req, res) => {
    const coffeeTypes = loadCoffeeTypes();
    res.json(coffeeTypes);
});

app.get('/roasters', (req, res) => {
    const roasters = loadRoasters();
    res.json(roasters);
});


app.post('/roasters', (req, res) => {
    console.log("📦 Incoming body:", req.body); // 🔍

    const newRoasters = req.body;

    if (
        typeof newRoasters.roasterName !== 'string'
    ) {
        console.error("❌ Invalid format received:", newRoasters);
        return res.status(400).json({ error: 'Invalid roaster format' });
    }

   const roasterWithServerMetadata = {
       ...newRoasters,
       id: uuidv4(),
   };

   const roasters = loadRoasters();
   roasters.push(roasterWithServerMetadata);
   saveRoasters(roasters);

    res.status(201).json(roasterWithServerMetadata);

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
    const brewWithServerMetadata = {
        ...newBrew,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
    };

    const brews = loadBrews();
    brews.push(brewWithServerMetadata);
    saveBrews(brews);

    console.log('Saved brew:', brewWithServerMetadata);
    res.status(201).json({ message: 'Brew saved' });
});

// POST /coffee-types → save new coffee type
app.post('/coffee-types', (req, res) => {
    const newCoffee = req.body;

    if (
        typeof newCoffee.id !== 'string' ||
        typeof newCoffee.name !== 'string' ||
        typeof newCoffee.roasterId !== 'string' ||
        typeof newCoffee.originLocation !== 'string' ||
        typeof newCoffee.elevation !== 'string' ||
        typeof newCoffee.roastLevel !== 'string'
    ) {
        return res.status(400).json({ error: 'Invalid coffee format' });
    }

    const coffeeTypes = loadCoffeeTypes();
    coffeeTypes.push(newCoffee);
    saveCoffeeTypes(coffeeTypes);

    res.status(201).json({ message: 'Coffee type saved' });
});

// DELETE /brews → remove unwanted brews
app.delete('/brews/:id', (req, res) => {
    const { id } = req.params;
    const brews = loadBrews();

    const updatedBrews = brews.filter(brew => brew.id !== id);

    if ( updatedBrews.length === brews.length ) {
        return res.status(404).json({ error: 'No brews found' });
    }

    saveBrews(updatedBrews);
    res.json({ message: 'Brew deleted' });
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`☕ Brew backend running at http://localhost:${PORT}`);
});

