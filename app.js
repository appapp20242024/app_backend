// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const moduleRoutes = require('./routes/moduleRoutes'); 
const quizRoutes = require('./routes/quizRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/modules', moduleRoutes); 
app.use('/api/quizzes', quizRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
