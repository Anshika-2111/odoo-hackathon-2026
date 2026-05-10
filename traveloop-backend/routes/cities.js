const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/search', async (req, res) => {
    try {
        const searchQuery = `%${req.query.q || ''}%`;
        const [cities] = await pool.query('SELECT * FROM cities WHERE city_name LIKE ? LIMIT 10', [searchQuery]);
        res.json(cities);
    } catch (error) { res.status(500).json({ error: 'Search failed' }); }
});
module.exports = router;
