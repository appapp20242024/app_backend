const userService = require('../services/userService');

// Controller lấy tất cả người dùng
const getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(result.status).json(result.data || { message: result.message });
};

// Controller tạo người dùng mới
const createUser = async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(result.status).json(result.data || { message: result.message });
};

// Controller để lấy một người dùng dựa trên ID
const getUserById = async (req, res) => {
  const userId = req.params.id; // Lấy ID từ route parameter
  const result = await userService.getUserById(userId);

  if (result.status === 200) {
    return res.status(200).json(result.data);
  } else {
    return res.status(result.status).json({ message: result.message });
  }
};

// Controller để cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  const userId = req.params.id; // Lấy ID từ route parameter
  const result = await userService.updateUser(userId, req.body);

  if (result.status === 200) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(result.status).json({ message: result.message });
  }
};

// Controller để xóa người dùng
const deleteUser = async (req, res) => {
  const userId = req.params.id; // Lấy ID từ route parameter
  const result = await userService.deleteUser(userId);

  if (result.status === 200) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(result.status).json({ message: result.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
