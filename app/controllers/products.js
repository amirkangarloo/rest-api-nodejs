'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');
const productUrl = "http://localhost:3000/products/";

// Get all products
exports.getAllProducts = (req, res) => {
    Product.find()
        .select("name price _id")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                products: docs.map((docs) => {
                    return {
                        name: docs.name,
                        price: docs.price,
                        _id: docs._id,
                        request: {
                            method: "GET",
                            url: productUrl + docs._id
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
};

// Create a new product
exports.createNewProduct = (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Created product successfully',
                createProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        method: "GET",
                        url: productUrl + result._id
                    }
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// Get one product by product ID
exports.getOneProduct = (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json({
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        method: "GET",
                        description: "GET_ALL_PRODUCTS",
                        url: productUrl
                    }
                });
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
};

// Update items a product by product ID
exports.updateProduct = (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value;
    };
    Product.findByIdAndUpdate({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: `UPDATE product by ID ${id}`,
                    request: {
                        method: "GET",
                        url: productUrl + id
                    }
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
};

// Delete product by product ID
exports.deleteProduct = (req, res) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id)
        .select('name price _id')
        .exec()
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: `Product by ID ${id} was deleted`,
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
};