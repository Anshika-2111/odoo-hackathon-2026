const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:trip_id', async (req, res) => {
    try {
        const [stops] = await pool.query(`
            SELECT s.*, c.city_name, c.country 
            FROM stops s JOIN cities c ON s.city_id = c.city_id 
            WHERE s.trip_id = ? ORDER BY s.stop_order ASC
        `, [req.params.trip_id]);
        res.json(stops);
    } catch (err) { res.status(500).json({ error: 'Failed to fetch stops' }); }
});

router.post('/', async (req, res) => {
    try {
        const { trip_id, city_id, arrival_date, departure_date, stop_order } = req.body;
        const [result] = await pool.query(
            'INSERT INTO stops (trip_id, city_id, arrival_date, departure_date, stop_order) VALUES (?, ?, ?, ?, ?)',
            [trip_id, city_id, arrival_date, departure_date, stop_order]
        );
        res.status(201).json({ stop_id: result.insertId });
    } catch (err) { res.status(500).json({ error: 'Failed to add stop' }); }
});

router.put('/reorder', async (req, res) => {
    try {
        const { stops } = req.body;
        for (const stop of stops) {
            await pool.query('UPDATE stops SET stop_order = ? WHERE stop_id = ?', [stop.stop_order, stop.stop_id]);
        }
        res.json({ message: 'Order updated' });
    } catch (err) { res.status(500).json({ error: 'Failed to reorder' }); }
});
module.exports = router;