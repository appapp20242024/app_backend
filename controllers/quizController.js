// controllers/quizController.js
const { db } = require('../config/firebaseConfig');

// Hàm tạo quiz từ flashcard
const createQuizFromFlashcard = async (req, res) => {
    const { moduleId } = req.body; // moduleId là ID của module chứa flashcard
    const createdAt = new Date();
    const updatedAt = createdAt;
    const maxQuestions = 10;

    try {
        // Lấy flashcard từ Firestore theo moduleId
        const flashcardSnapshot = await db.collection('flashcard')
            .where('moduleId', '==', moduleId) // Lọc flashcard theo moduleId
            .get();

        if (flashcardSnapshot.empty) {
            return res.status(404).send({ message: 'No flashcard found for this module.', moduleId });
        }

        // Tạo danh sách flashcard
        const flashcards = flashcardSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Lấy số câu hỏi tối đa
        const numberOfQuestions = Math.min(flashcards.length, maxQuestions);
        
        // Tạo quiz object
        const quizId = `quiz_${Date.now()}`; // Tạo ID cho quiz
        const quizData = {
            id: quizId,
            questions: [],
            createdAt,
            updatedAt,
        };

        // Tạo câu hỏi cho quiz
        for (let i = 0; i < numberOfQuestions; i++) {
            const flashcard = flashcards[i];

            // Lấy tất cả câu trả lời từ flashcards trong cùng module, giới hạn chỉ 3 options khác
            const otherAnswers = flashcards
                .filter(fc => fc.id !== flashcard.id) // Loại bỏ câu trả lời của flashcard hiện tại
                .map(fc => fc.answer) // Lấy câu trả lời của flashcard khác
                .sort(() => 0.5 - Math.random()) // Trộn ngẫu nhiên
                .slice(0, 3); // Giới hạn 3 câu trả lời khác

            // Tạo danh sách options từ answer và otherAnswers
            const options = [flashcard.answer, ...otherAnswers];
            const shuffledOptions = options.sort(() => 0.5 - Math.random()); // Random hóa options

            // Tạo câu hỏi cho quiz
            quizData.questions.push({
                question: flashcard.question, // Lấy câu hỏi từ flashcard
                options: shuffledOptions, // Các lựa chọn đã random
                correctAnswer: flashcard.answer, // Câu trả lời đúng
                moduleId: flashcard.moduleId, // Lưu moduleId
            });
        }

        // Lưu quiz vào Firestore
        await db.collection('quizzes').doc(quizId).set(quizData);

        res.status(201).send({ message: 'Quiz created successfully!', quiz: quizData });
    } catch (error) {
        console.error(error); // Ghi lỗi ra console để debug
        res.status(500).send({ error: 'An error occurred while creating the quiz.' });
    }
};

module.exports = { createQuizFromFlashcard };
