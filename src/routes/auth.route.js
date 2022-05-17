const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { signUpSchema, createSessionSchema, closeSessionSchema } = require("../schema/auth.schema");
const {validateSchema} = require("../middleware/validateSchema");

const router = express.Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   POST api/auth/signup
// @desc    Create a user
// @access  Public
router.post('/signup', validateSchema(signUpSchema), AuthController.singUpHandler);

// @route   POST api/auth/login
// @desc    Login with credentials
// @access  Public
router.post('/login', validateSchema(createSessionSchema), AuthController.createSessionHandler);

// @route   POST api/auth/logout
// @desc    Logout of all devices
// @access  Public
router.post('/logout',validateSchema(closeSessionSchema), AuthController.closeSessionHandler);


module.exports = router;