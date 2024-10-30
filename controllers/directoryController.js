const directoryService = require('../services/directoryService');

// Lấy tất cả directories
const getAllDirectories = async (req, res) => {
  const result = await directoryService.getAllDirectories();
  res.status(result.status).json(result.data || { message: result.message });
};

// Lấy directory theo ID và bao gồm thông tin module liên kết
const getDirectoryById = async (req, res) => {
  const directoryId = req.params.id;
  const result = await directoryService.getDirectoryById(directoryId);
  res.status(result.status).json(result.data || { message: result.message });
};

// Tạo directory mới và liên kết với module
const createDirectory = async (req, res) => {
  const result = await directoryService.createDirectory(req.body);
  res.status(result.status).json(result.data || { message: result.message });
};

// Cập nhật directory và liên kết với module
const updateDirectory = async (req, res) => {
  const directoryId = req.params.id;
  const result = await directoryService.updateDirectory(directoryId, req.body);
  res.status(result.status).json({ message: result.message });
};

// Xóa directory và liên kết với module
const deleteDirectory = async (req, res) => {
  const directoryId = req.params.id;
  const result = await directoryService.deleteDirectory(directoryId);
  res.status(result.status).json({ message: result.message });
};

module.exports = {
  getAllDirectories,
  getDirectoryById,
  createDirectory,
  updateDirectory,
  deleteDirectory
};
