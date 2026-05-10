const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [trips] = await pool.query('SELECT * FROM trips WHERE user_id = ? ORDER BY start_date ASC', [req.user.id]);
        res.json(trips);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch' }); }
});

router.get('/:id', async (req, res) => {
    try {
        const [trips] = await pool.query('SELECT * FROM trips WHERE trip_id = ? AND user_id = ?', [req.params.id, req.user.id]);
        if (trips.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(trips[0]);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch' }); }
});

router.post('/', async (req, res) => {
    try {
        const { trip_name, start_date, end_date, description, total_budget } = req.body;
        const [result] = await pool.query(
            'INSERT INTO trips (user_id, trip_name, start_date, end_date, description, total_budget) VALUES (?, ?, ?, ?, ?, ?)',
            [req.user.id, trip_name, start_date, end_date, description, total_budget || 0]
        );
        res.status(201).json({ trip_id: result.insertId });
    } catch (error) { res.status(500).json({ error: 'Failed to create' }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM trips WHERE trip_id = ? AND user_id = ?', [req.params.id, req.user.id]);
        res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete' }); }
});
module.exports = router;