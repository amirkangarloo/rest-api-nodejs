'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRouters = require('./app/routes/products');
const orderRouters = require('./app/routes/orders');
const userRouters = require('./app/routes/users');

const app = express();

mongoose.connect('mongodb+srv://node-rest-api:' +
    process.env.MONGO_ATLAS_PASSWORD +
    '@node-rest-api.gcyge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'GET, POST, DELETE, PUT, PATCH');
        return res.status(200).json({});
    }
    next();
});

// Routers for handle requests
app.use('/products', productRouters);
app.use('/orders', orderRouters);
app.use('/users', userRouters);

// Handling Errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message
            }
        });
});

module.exports = app;