const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// POST /api/carts/:cartId/checkout
router.post('/:cartId/checkout', checkoutController.checkoutCart);

module.exports = router;