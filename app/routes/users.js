'use strict';

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const usersControllers = require('../controllers/users');

// Handle incoming POST requests to /users/singup
router.post('/singup', usersControllers.userSingup);

// Handle incoming POST requests to /users/login
router.post('/login', usersControllers.userLogin);

// Handle incoming DELETE requests to /users/:userId
router.delete('/:userId', checkAuth, usersControllers.userDelete);

module.exports = router;