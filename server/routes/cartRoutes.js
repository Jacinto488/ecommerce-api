const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// Get cart
router.get('/:userId', cartController.getCart);

// Add item to cart
router.post('/:userId', cartController.addToCart);

// Checkout
router.post('/:userId/checkout', cartController.checkout);

module.exports = router;