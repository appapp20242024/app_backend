const { db } = require('../config/firebaseConfig');

// Lấy tất cả người dùng từ Firestore
const getAllUsers = async () => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      status: 200,
      data: users
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message
    };
  }
};

// Tạo người dùng mới trong Firestore
const createUser = async (data) => {
  const { name, mail, password, address, phone } = data;

  const createdAt = Date.now();
  const updatedAt = Date.now();

  try {
    const newUser = await db.collection('users').add({
      name,
      mail,
      password,
      address,
      phone,
      created_at: createdAt,
      updated_at: updatedAt
    });

    return {
      status: 201,
      data: {
        name,
        mail,
        password,
        address,
        phone,
        created_at: createdAt,
        updated_at: updatedAt
      }
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message
    };
  }
};

// Lấy một người dùng dựa trên ID từ Firestore
const getUserById = async (id) => {
  try {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    return {
      status: 200,
      data: { id: doc.id, ...doc.data() },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Cập nhật thông tin người dùng trong Firestore
const updateUser = async (id, data) => {
  const { name, mail, password, address, phone } = data;
  const updatedAt = Date.now();

  try {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    await userRef.update({
      name,
      mail,
      password,
      address,
      phone,
      updated_at: updatedAt,
    });

    return {
      status: 200,
      message: 'User updated successfully',
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Xóa người dùng khỏi Firestore
const deleteUser = async (id) => {
  try {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    await userRef.delete();

    return {
      status: 200,
      message: 'User deleted successfully',
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
