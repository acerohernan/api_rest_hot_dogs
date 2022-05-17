const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   POST api/auth/signup
// @desc    Create a user
// @access  Public
router.post('/signup', AuthController.singUpHandler);

// @route   POST api/auth/login
// @desc    Login with credentials
// @access  Public
router.post('/login', AuthController.createSessionHandler);

// @route   POST api/auth/logout
// @desc    Logout of all devices
// @access  Public
router.post('/logout', AuthController.closeSessionHandler);


module.exports = router;