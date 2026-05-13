const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders for a user
router.get('/user/:userId', orderController.getOrders);

// Get details for a specific order
router.get('/:orderId', orderController.getOrderById);

module.exports = router;