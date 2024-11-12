const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // For user-specific actions
const authController = require('../controllers/authController'); // For authentication actions

// User-related routes
router.get('/getAllUsers', userController.getAllUsers); 
router.post('/createUser', userController.createUser);
router.get('/getUser/:id', userController.getUserById);  // Corrected route
router.put('/updateUser/:id', userController.updateUser);  // PUT for update

// Authentication-related routes
router.post('/register', authController.registerUser); // User registration
router.post('/login', authController.loginUser); // User login
router.put('/update', authController.updateUser); // Update user information

router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
