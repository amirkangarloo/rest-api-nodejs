'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');
const orderUrl = "http://localhost:3000/orders/";

router.get('/', checkAuth, (req, res) => {
    Order.find()
        .select("product quantity _id")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                orders: docs.map((docs) => {
                    return {
                        _id: docs._id,
                        product: docs.product,
                        quantity: docs.quantity,
                        request: {
                            method: "GET",
                            url: orderUrl + docs._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', checkAuth, (req, res) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Order was created',
                order: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        method: "GET",
                        url: orderUrl + result._id
                    }
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:orderId', checkAuth, (req, res) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        method: "GET",
                        description: "GET_ALL_ORDERS",
                        url: orderUrl
                    }
                });
                return;
            }
            res.status(404).json({
                message: "NOT FOUND"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderId', checkAuth, (req, res) => {
    const id = req.params.orderId;
    Order.findByIdAndRemove(id)
        .select('product quantity _id')
        .exec()
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: `Order by ID ${id} was deleted`,
                    product: result
                });
                return;
            }
            res.status(404).json({
                message: `NOT FOUND order by ID ${id}`
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