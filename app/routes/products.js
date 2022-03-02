'use strict';

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productsControllers = require('../controllers/products');

// Handle incoming GET requests to /products 
router.get('/', productsControllers.getAllProducts);

// Handle incoming POST requests to /products
router.post('/', checkAuth, productsControllers.createNewProduct);

// Handle incoming GET requests to /products/:productID 
router.get('/:productId', productsControllers.getOneProduct);

// Handle incoming PATCH requests to /products/:productID 
router.patch('/:productId', checkAuth, productsControllers.updateProduct);

// Handle incoming DELETE requests to /products/:productID 
router.delete('/:productId', checkAuth, productsControllers.deleteProduct);

module.exports = router;