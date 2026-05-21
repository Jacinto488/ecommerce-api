const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// User order history
router.get('/:userId', orderController.getOrders);

// Single order
router.get('/single/:orderId', orderController.getOrderById);

module.exports = router;