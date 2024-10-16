// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy danh sách tất cả người dùng (GET request)
router.get('/getAllUsers', userController.getAllUsers);

// Tạo một người dùng mới (POST request)
router.post('/createUser', userController.createUser);

module.exports = router;
