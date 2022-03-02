'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodet = jwt.verify(token, "my name is amir");
        req.userData = decodet;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};