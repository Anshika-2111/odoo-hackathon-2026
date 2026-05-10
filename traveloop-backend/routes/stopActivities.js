const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    try {
        const { stop_id, activity_name, activity_type, activity_date, activity_time, cost, notes } = req.body;
        const [result] = await pool.query(
            'INSERT INTO activities (stop_id, activity_name, activity_type, activity_date, activity_time, cost, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [stop_id, activity_name, activity_type, activity_date, activity_time, cost, notes]
        );
        res.status(201).json({ activity_id: result.insertId });
    } catch (error) { res.status(500).json({ error: 'Failed to add activity' }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM activities WHERE activity_id = ?', [req.params.id]);
        res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete' }); }
});
module.exports = router;
