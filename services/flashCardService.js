const { db } = require('../config/firebaseConfig');

// Tạo flashcard mới
const createFlashCard = async (data) => {
  const { answer, module_id, pickedstar, question } = data;
  const createdAt = Date.now();
  const updatedAt = Date.now();

  try {
    const newData = await db.collection('flashcards').add({
      answer,
      module_id,
      pickedstar,
      question,
      created_at: createdAt,
      updated_at: updatedAt
    });

    return {
      status: 201,
      data: {
        flashcard_id: newData.id,
        answer,
        pickedstar,
        question,
        created_at: createdAt,
        updated_at: updatedAt
      }
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

// Lấy tất cả flashcards
const getAllFlashCard = async () => {
  try {
    const data = await db.collection('flashcards').get();
    const flashCards = data.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { status: 200, data: flashCards };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Lấy một flashcard dựa trên ID
const getFlashCardById = async (id) => {
  try {
    const cardRef = db.collection('flashcards').doc(id);
    const doc = await cardRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Flashcard not found' };
    }

    return { status: 200, data: { id: doc.id, ...doc.data() } };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Cập nhật flashcard
const updateFlashCard = async (id, data) => {
  const { answer, module_id, pickedstar, question } = data;
  const updatedAt = Date.now();

  try {
    const cardRef = db.collection('flashcards').doc(id);
    const doc = await cardRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Flashcard not found' };
    }

    await cardRef.update({
      answer,
      module_id,
      pickedstar,
      question,
      updated_at: updatedAt
    });

    return { status: 200, message: 'Flashcard updated successfully' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Xóa flashcard
const deleteFlashCard = async (id) => {
  try {
    const cardRef = db.collection('flashcards').doc(id);
    const doc = await cardRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Flashcard not found' };
    }

    await cardRef.delete();
    return { status: 200, message: 'Flashcard deleted successfully' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = {
  createFlashCard,
  getAllFlashCard,
  getFlashCardById,
  updateFlashCard,
  deleteFlashCard
};
