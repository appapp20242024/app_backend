const flashCardService = require("../services/flashCardService");

const createFlashCard = async (req, res) => {
  const result = await flashCardService.createFlashCard(req.body);
  res.status(result.status).json(result.data || { message: result.message });
};

const getAllFlashCard = async (req, res) => {
  const result = await flashCardService.getAllFlashCard();
  res.status(result.status).json(result.data || { message: result.message });
};

const getFlashCardById = async (req, res) => {
  const flashcardId = req.params.id;
  const result = await flashCardService.getFlashCardById(flashcardId);
  res.status(result.status).json(result.data || { message: result.message });
};

const updateFlashCard = async (req, res) => {
  const flashcardId = req.params.id;
  const result = await flashCardService.updateFlashCard(flashcardId, req.body);
  res.status(result.status).json({ message: result.message });
};

const deleteFlashCard = async (req, res) => {
  const flashcardId = req.params.id;
  const result = await flashCardService.deleteFlashCard(flashcardId);
  res.status(result.status).json({ message: result.message });
};

module.exports = {
  createFlashCard,
  getAllFlashCard,
  getFlashCardById,
  updateFlashCard,
  deleteFlashCard
};
