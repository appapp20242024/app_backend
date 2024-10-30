const { db } = require('../config/firebaseConfig');

// Lấy tất cả directories
const getAllDirectories = async () => {
  try {
    const snapshot = await db.collection('directory').get();
    const directories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { status: 200, data: directories };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Lấy directory theo ID và bao gồm thông tin module từ `directory_module`
const getDirectoryById = async (id) => {
  try {
    const directoryRef = db.collection('directory').doc(id);
    const directoryDoc = await directoryRef.get();

    if (!directoryDoc.exists) {
      return { status: 404, message: 'Directory not found' };
    }

    const directoryData = directoryDoc.data();

    // Lấy module_id từ bảng `directory_module`
    const moduleDirectorySnapshot = await db.collection('directory_module')
      .where('directory_id', '==', id)
      .get();

    let moduleData = null;

    if (!moduleDirectorySnapshot.empty) {
      const moduleDocId = moduleDirectorySnapshot.docs[0].data().module_id;

      // Lấy thông tin module từ bảng `modules` dựa trên `module_id`
      const moduleRef = db.collection('modules').doc(moduleDocId);
      const moduleDoc = await moduleRef.get();

      if (moduleDoc.exists) {
        moduleData = moduleDoc.data();
      }
    }

    return {
      status: 200,
      data: {
        id: directoryDoc.id,
        ...directoryData,
        module: moduleData // Thêm thông tin module vào kết quả trả về
      }
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Tạo directory mới
const createDirectory = async (data) => {
  const { name, description, user_id, module_id } = data;
  const createdAt = Date.now();
  const updatedAt = Date.now();

  try {
    // Tạo mới directory trong bảng `directory`
    const newDirectory = await db.collection('directory').add({
      name,
      description,
      user_id,
      created_at: createdAt,
      updated_at: updatedAt
    });

    // Thêm liên kết module_id trong bảng `directory_module`
    if (module_id) {
      await db.collection('directory_module').add({
        directory_id: newDirectory.id,
        module_id
      });
    }

    return {
      status: 201,
      data: {
        id: newDirectory.id,
        name,
        description,
        user_id,
        module_id,
        created_at: createdAt,
        updated_at: updatedAt
      }
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

// Cập nhật directory
const updateDirectory = async (id, data) => {
  const { name, description, user_id, module_id } = data;
  const updatedAt = Date.now();

  try {
    const directoryRef = db.collection('directory').doc(id);
    const doc = await directoryRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Directory not found' };
    }

    // Cập nhật thông tin directory
    await directoryRef.update({
      name,
      description,
      user_id,
      updated_at: updatedAt
    });

    // Cập nhật hoặc tạo liên kết module_id trong `directory_module`
    const moduleDirectorySnapshot = await db.collection('directory_module')
      .where('directory_id', '==', id)
      .get();

    if (!moduleDirectorySnapshot.empty) {
      // Cập nhật module_id nếu đã tồn tại
      const moduleDocId = moduleDirectorySnapshot.docs[0].id;
      await db.collection('directory_module').doc(moduleDocId).update({
        module_id
      });
    } else {
      // Tạo mới liên kết module_id nếu chưa tồn tại
      await db.collection('directory_module').add({
        directory_id: id,
        module_id
      });
    }

    return { status: 200, message: 'Directory updated successfully' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Xóa directory và liên kết module_id
const deleteDirectory = async (id) => {
  try {
    const directoryRef = db.collection('directory').doc(id);
    const doc = await directoryRef.get();

    if (!doc.exists) {
      return { status: 404, message: 'Directory not found' };
    }

    // Xóa tài liệu trong bảng `directory`
    await directoryRef.delete();

    // Xóa các liên kết module_id trong `directory_module`
    const moduleDirectorySnapshot = await db.collection('directory_module')
      .where('directory_id', '==', id)
      .get();

    moduleDirectorySnapshot.forEach(async (moduleDoc) => {
      await db.collection('directory_module').doc(moduleDoc.id).delete();
    });

    return { status: 200, message: 'Directory deleted successfully' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = {
  getAllDirectories,
  getDirectoryById,
  createDirectory,
  updateDirectory,
  deleteDirectory
};
