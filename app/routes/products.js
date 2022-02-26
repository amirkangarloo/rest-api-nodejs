'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find()
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Hnadeling POST request to /products',
                createProduct: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then((doc) => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
                return;
            }
            res.status(404).json({
                error: "NOT FOUND",
                message: "Your product ID isn't correct."
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value;
    };
    Product.findByIdAndUpdate({_id: id}, {$set: updateOps})
        .exec()
        .then((result) => {
            console.log(result);
            if (result) {
                res.status(200).json({
                    message: `UPDATE product by ID ${id}`
                });
                return;
            }
            res.status(404).json({
                message: `NOT FOUND product by ID ${id}`
            });

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id)
        .exec()
        .then((result) => {
            console.log(result);
            if (result) {
                res.status(200).json({
                    message: `Product by ID ${id} has delete`,
                    product: result
                });
                return;
            }
            res.status(404).json({
                message: `NOT FOUND product by ID ${id}`
            });

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;