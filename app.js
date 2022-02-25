'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRouters = require('./app/routes/products');
const orderRouters = require('./app/routes/orders');

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Routers for handle requests
app.use('/products', productRouters);
app.use('/orders', orderRouters);

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