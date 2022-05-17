const express = require("express");
const DogController = require("../controllers/dog.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const {validateSchema} = require("../middleware/validateSchema");
const { createDogSchema, findDogSchema, updateDogSchema, deleteDogSchema } = require("../schema/dog.schema");

const router = express.Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   POST api/dog/new
// @desc    Create a dog
// @access  Public
router.post('/new', [authMiddleware, validateSchema(createDogSchema)], DogController.createDogHandler);

// @route   GET api/dog/all
// @desc    Get all dogs from a user
// @access  Public
router.get('/all',authMiddleware ,DogController.findDogsFromUserHandler);

// @route   GET api/dog/:dogId
// @desc    Find a dog with dogId
// @access  Public
router.get('/:dogId', [authMiddleware, validateSchema(findDogSchema)], DogController.findDogHandler);

// @route   POST api/dog/:dogId
// @desc    Logout of all devices
// @access  Public
router.put('/:dogId', [authMiddleware, validateSchema(updateDogSchema)], DogController.updateDogHandler);

// @route   POST api/dog/:dogId
// @desc    Logout of all devices
// @access  Public
router.delete('/:dogId', [authMiddleware, validateSchema(deleteDogSchema)], DogController.deleteDogHandler);


module.exports = router;