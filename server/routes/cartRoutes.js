const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart by user
router.get('/:userId', cartController.getCart);

// Add product to cart
router.post('/:userId', cartController.addToCart);

// Update cart item quantity
router.put('/item/:cartItemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/item/:cartItemId', cartController.removeCartItem);

module.exports = router;