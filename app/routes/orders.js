'use strict';

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ordersControllers = require('../controllers/orders');

// Handle incoming GET requests to /orders 
router.get('/', checkAuth, ordersControllers.getAllOrders);

// Handle incoming POST requests to /orders 
router.post('/', checkAuth, ordersControllers.createNewOrder);

// Handle incoming GET requests to /orders/:orderID 
router.get('/:orderId', checkAuth, ordersControllers.getOneOrder);

// Handle incoming DELETE requests to /orders/:orderID 
router.delete('/:orderId', checkAuth, ordersControllers.deleteOrder);

module.exports = router;