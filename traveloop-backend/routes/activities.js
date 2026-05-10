const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [activities] = await pool.query('SELECT * FROM activities WHERE stop_id = ?', [req.query.stop_id]);
        res.json(activities);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch' }); }
});
module.exports = router;
