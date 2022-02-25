'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res) => {
    res.status(201).json({
        message: 'Order was created'
    });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId;

    res.status(200).json({
            message: 'Order details',
            ID: id
        });
});

router.delete('/:productId', (req, res) => {
    const id = req.params.productId;

    res.status(200).json({
            message: 'Order deleted',
            ID: id
        });
});

module.exports = router;