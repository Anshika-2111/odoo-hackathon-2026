const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { generateToken } = require('../utils/shareToken');

// Generate a share link
router.post('/generate', async (req, res) => {
    try {
        const token = generateToken();
        const { trip_id } = req.body;
        await pool.query('INSERT INTO shared_trips (trip_id, share_token, is_public) VALUES (?, ?, 1)', [trip_id, token]);
        res.json({ share_token: token });
    } catch (error) { res.status(500).json({ error: 'Failed to share' }); }
});

// View a shared trip (NO AUTH REQUIRED)
router.get('/:token', async (req, res) => {
    try {
        const [shared] = await pool.query(`
            SELECT t.* FROM trips t 
            JOIN shared_trips st ON t.trip_id = st.trip_id 
            WHERE st.share_token = ? AND st.is_public = 1
        `, [req.params.token]);
        
        if (shared.length === 0) return res.status(404).json({ error: 'Invalid or private link' });
        res.json(shared[0]);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch shared trip' }); }
});
module.exports = router;