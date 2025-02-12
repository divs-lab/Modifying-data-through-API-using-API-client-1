const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Create a new menu item
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    if (!name || price == null) return res.status(400).json({ error: 'Name and price are required' });

    try {
        const newItem = await MenuItem.create({ name, description, price });
        res.status(201).json({ message: 'Menu item added successfully', newItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all menu items
router.get('/', async (_, res) => {
    try {
        res.status(200).json(await MenuItem.find());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
