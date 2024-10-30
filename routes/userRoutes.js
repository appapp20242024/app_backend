// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // For user-specific actions
const authController = require('../controllers/authController'); // For authentication actions

// User-related routes
router.get('/getAllUsers', userController.getAllUsers); // Fetch all users
router.post('/createUser', userController.createUser); // Create a new user

// Authentication-related routes
router.post('/register', authController.registerUser); // User registration
router.post('/login', authController.loginUser); // User login
router.put('/update', authController.updateUser); // Update user information

module.exports = router;
