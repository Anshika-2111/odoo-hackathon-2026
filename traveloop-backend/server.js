const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/share', require('./routes/share'));

// Protected Routes (Require JWT)
app.use('/api/trips', authMiddleware, require('./routes/trips'));
app.use('/api/stops', authMiddleware, require('./routes/stops'));
app.use('/api/cities', authMiddleware, require('./routes/cities'));
app.use('/api/activities', authMiddleware, require('./routes/activities'));
app.use('/api/stop-activities', authMiddleware, require('./routes/stopActivities'));
// (You can map checklist/notes here later using the exact same pattern)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Traveloop Backend running on port ${PORT}`);
});