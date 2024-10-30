const { db } = require('../config/firebaseConfig');

// Lấy tất cả module
const getAllModules = async () => {
  try {
    const snapshot = await db.collection('module').get();
    const modules = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { status: 200, data: modules };
  } catch (error) {
    console.error('Error fetching modules:', error);
    return { status: 500, message: error.message };
  }
};

const getModuleById = async (id) => {
  try {
    const moduleRef = db.collection('module').doc(id);
    const moduleDoc = await moduleRef.get();

    if (!moduleDoc.exists) {
      return { status: 404, message: 'Module not found' };
    }

    const moduleData = { id: moduleDoc.id, ...moduleDoc.data() };

    const flashCardSnapshot = await db.collection('flashcards')
      .where('module_id', '==', moduleData.id)
      .get();

    const flashCards = flashCardSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      status: 200,
      data: {
        module: moduleData,
        flashCards: flashCards
      }
    };
  } catch (error) {
    console.error('Error fetching module by ID:', error);
    return { status: 500, message: error.message };
  }
};

    

// Tạo module mới
const createModule = async (data) => {
  const { name, description } = data;
  const createdAt = Date.now();
  const updatedAt = Date.now();

  try {
    const newModule = await db.collection('module').add({
      name,
      description,
      created_at: createdAt,
      updated_at: updatedAt
    });

    return {
      status: 201,
      data: { id: newModule.id, name, description, created_at: createdAt, updated_at: updatedAt }
    };
  } catch (error) {
    console.error('Error creating module:', error);
    return { status: 400, message: error.message };
  }
};

// Cập nhật module
const updateModule = async (id, data) => {
  const { name, description } = data;
  const updatedAt = Date.now();

  try {
    const moduleRef = db.collection('module').doc(id);
    const doc = await moduleRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Module not found' };
    }

    await moduleRef.update({
      name,
      description,
      updated_at: updatedAt
    });

    return { status: 200, message: 'Module updated successfully' };
  } catch (error) {
    console.error('Error updating module:', error);
    return { status: 500, message: error.message };
  }
};

// Xóa module
const deleteModule = async (id) => {
  try {
    const moduleRef = db.collection('module').doc(id);
    const doc = await moduleRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Module not found' };
    }

    await moduleRef.delete();
    return { status: 200, message: 'Module deleted successfully' };
  } catch (error) {
    console.error('Error deleting module:', error);
    return { status: 500, message: error.message };
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
};
