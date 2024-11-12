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

const updateUser = async (req, res) => {
  const userId = req.params.id;  // Lấy ID từ route parameter
  const updatedData = req.body;

  // Lọc ra các trường hợp có giá trị hợp lệ (không phải undefined)
  const cleanedData = Object.fromEntries(
    Object.entries(updatedData).filter(([key, value]) => value !== undefined && value !== null)
  );

  // Kiểm tra nếu không có dữ liệu hợp lệ để cập nhật
  if (Object.keys(cleanedData).length === 0) {
    return res.status(400).json({ message: 'No valid data to update. Please provide valid fields.' });
  }

  try {
    const result = await userService.updateUser(userId, cleanedData);

    // Kiểm tra kết quả và trả về phản hồi tương ứng
    if (result.status === 200) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(result.status).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    // Cung cấp thông báo lỗi chi tiết khi có sự cố với server
    return res.status(500).json({ message: 'Server error while updating user. Please try again later.' });
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
