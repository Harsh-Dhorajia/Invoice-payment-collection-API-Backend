const express = require('express');
const userRoutes = require('./user/user.routes');
const invoicesRoutes = require('./invoices/invoice.routes');

const router = express.Router();
router.get('/api-status', (req, res) =>
    res.json({
        status: 'ok'
    })
);
router.use('/auth', userRoutes);
router.use('/invoices', invoicesRoutes);

module.exports = router;
