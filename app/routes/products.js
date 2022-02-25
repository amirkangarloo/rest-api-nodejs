'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hnadeling GET request to /products'
    });
});

router.post('/', (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Hnadeling POST request to /products',
        createProduct: product
    });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId;

    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            ID: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res) => {
    res.status(200).json({
        message: 'Update product!'
    });
});

router.delete('/:productId', (req, res) => {
    res.status(200).json({
        message: 'Delete product!'
    });
});

module.exports = router;