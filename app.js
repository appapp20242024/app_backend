// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const flashCardRoutes = require('./routes/flashCardRoutes'); // Sửa lại từ "flashCradRoutes" thành "flashCardRoutes"
const moduleRoutes = require('./routes/moduleRoutes');
const directoryRoutes = require('./routes/directoryRoutes');
// Middleware để phân tích dữ liệu JSON từ body của request
app.use(express.json());

// Sử dụng các route cho API người dùng
app.use('/api/users', userRoutes);
app.use('/api/flashcards', flashCardRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/directory', directoryRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
