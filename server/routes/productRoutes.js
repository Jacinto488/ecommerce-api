const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route order matters in Express!

// Create a product
router.post('/', productController.createProduct);

// Search products by query
router.get('/search', productController.searchProducts);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Get all products
router.get('/', productController.getProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;