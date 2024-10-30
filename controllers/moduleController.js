const moduleService = require('../services/moduleService');

// Lấy tất cả modules
const getAllModules = async (req, res) => {
  const result = await moduleService.getAllModules();
  res.status(result.status).json(result.data || { message: result.message });
};

// Lấy module theo ID
const getModuleById = async (req, res) => {
  const moduleId = req.params.id;
  const result = await moduleService.getModuleById(moduleId);
  res.status(result.status).json(result.data || { message: result.message });
};

// Tạo module mới
const createModule = async (req, res) => {
  const result = await moduleService.createModule(req.body);
  res.status(result.status).json(result.data || { message: result.message });
};

// Cập nhật module
const updateModule = async (req, res) => {
  const moduleId = req.params.id;
  const result = await moduleService.updateModule(moduleId, req.body);
  res.status(result.status).json({ message: result.message });
};

// Xóa module
const deleteModule = async (req, res) => {
  const moduleId = req.params.id;
  const result = await moduleService.deleteModule(moduleId);
  res.status(result.status).json({ message: result.message });
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
};
