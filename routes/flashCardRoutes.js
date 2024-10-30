const express = require('express');
const router = express.Router();
const flashCardController = require('../controllers/flashCardController');

// Tạo flashcard mới
router.post('/createFlashCard', flashCardController.createFlashCard);

// Lấy tất cả flashcards
router.get('/getFlashCardAll', flashCardController.getAllFlashCard);

// Lấy flashcard theo ID
router.get('/getFlashCard/:id', flashCardController.getFlashCardById);

// Cập nhật flashcard theo ID
router.put('/updateFlashCard/:id', flashCardController.updateFlashCard);

// Xóa flashcard theo ID
router.delete('/deleteFlashCard/:id', flashCardController.deleteFlashCard);

module.exports = router;
