// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware để phân tích dữ liệu JSON từ body của request
app.use(express.json());

// Sử dụng các route cho API người dùng
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
