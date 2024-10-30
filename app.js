const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const flashCardRoutes = require('./routes/flashCardRoutes'); // Sửa lại từ "flashCradRoutes" thành "flashCardRoutes"
const moduleRoutes = require('./routes/moduleRoutes');
const directoryRoutes = require('./routes/directoryRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/flashcards', flashCardRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/directory', directoryRoutes);

// Thay vì `app.listen`, xuất app như một module
module.exports = app;
