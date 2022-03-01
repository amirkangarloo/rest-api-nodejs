'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // use this package for hashing passwords
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/singup', (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                // Check for duplicate emails
                return res.status(409).json({
                    message: "Email exists"
                });
            } else {
                // this block create users
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    };
                });
            }
        })
});

router.post('/login', (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {

            // this check for some attacks like Brute-force
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            // checking password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            _id: user[0]._id
                        },
                        "my name is amir",
                        {
                            expiresIn: "2h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed. wrong password"
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res) => {
    User.remove({_id: req.body.userId})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "user delete"
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