'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decodet = jwt.verify(req.body.token, "my name is amir");
        req.userData = decodet;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};