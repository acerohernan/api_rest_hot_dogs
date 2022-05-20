const express = require("express");
const DogController = require("../controllers/dog.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const {validateSchema} = require("../middleware/validateSchema");
const { createDogSchema, findDogSchema, updateDogSchema, deleteDogSchema, addDogFavoriteSchema, deleteDogFavoriteSchema, getDogFavoritesSchema } = require("../schema/dog.schema");

const router = express.Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   POST api/dog/new
// @desc    Create a dog
// @access  Private
router.post('/new', [authMiddleware, validateSchema(createDogSchema)], DogController.createDogHandler);

// @route   GET api/dog/all
// @desc    Get all dogs from a user
// @access  Private
router.get('/all',authMiddleware ,DogController.findDogsFromUserHandler);

// @route   GET api/dog/:dogId
// @desc    Find a dog with dogId
// @access  Private
router.get('/:dogId', [authMiddleware, validateSchema(findDogSchema)], DogController.findDogHandler);

// @route   PUT api/dog/:dogId
// @desc    Update dog information
// @access  Private
router.put('/:dogId', [authMiddleware, validateSchema(updateDogSchema)], DogController.updateDogHandler);

// @route   DELETE api/dog/:dogId
// @desc    Delete a dog
// @access  Private
router.delete('/:dogId', [authMiddleware, validateSchema(deleteDogSchema)], DogController.deleteDogHandler);

// @route   GET api/dog/fav
// @desc    Get all the favs of a dog
// @access  Private
router.post('/fav/all', [authMiddleware, validateSchema(getDogFavoritesSchema)], DogController.getAllDogFavorites);

// @route   POST api/dog/fav/add
// @desc    Add a fav dog
// @access  Private
router.post('/fav/add', [authMiddleware, validateSchema(addDogFavoriteSchema)], DogController.addDogFavorite);

// @route   DELETE api/dog/fav/:dogId
// @desc    Delete a fav dog
// @access  Private
router.delete('/fav/:favId', [authMiddleware, validateSchema(deleteDogFavoriteSchema)], DogController.deleteDogFavorite);

module.exports = router;