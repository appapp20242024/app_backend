const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const flashCardRoutes = require('./routes/flashCardRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const directoryRoutes = require('./routes/directoryRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/flashcards', flashCardRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/directory', directoryRoutes);

// Sử dụng `process.env.PORT` thay vì cổng cố định
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
