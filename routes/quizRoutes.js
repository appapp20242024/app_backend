// routes/quizRoutes.js
const express = require('express');
const { createQuizFromFlashcard } = require('../controllers/quizController'); // Import hàm từ controller
const router = express.Router();

// API để tạo quiz từ flashcard
router.post('/create-from-flashcard', createQuizFromFlashcard); // Sử dụng hàm từ controller

module.exports = router;
