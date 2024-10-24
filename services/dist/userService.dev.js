"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../config/firebaseConfig'),
    db = _require.db;

var getAllUsers = function getAllUsers() {
  var snapshot, users;
  return regeneratorRuntime.async(function getAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.collection('users').get());

        case 3:
          snapshot = _context.sent;
          users = snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          });
          return _context.abrupt("return", {
            status: 200,
            data: users
          });

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            status: 500,
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var createUser = function createUser(data) {
  var name, mail, password, address, phone, createdAt, updatedAt, newUser;
  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          name = data.name, mail = data.mail, password = data.password, address = data.address, phone = data.phone;
          createdAt = Date.now();
          updatedAt = Date.now();
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(db.collection('users').add({
            name: name,
            mail: mail,
            password: password,
            address: address,
            phone: phone,
            created_at: createdAt,
            updated_at: updatedAt
          }));

        case 6:
          newUser = _context2.sent;
          return _context2.abrupt("return", {
            status: 201,
            data: {
              id: newUser.id,
              name: name,
              mail: mail,
              password: password,
              address: address,
              phone: phone,
              created_at: createdAt,
              updated_at: updatedAt
            }
          });

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", {
            status: 400,
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
}; // Lấy một người dùng dựa trên ID từ Firestore


var getUserById = function getUserById(id) {
  var userRef, doc;
  return regeneratorRuntime.async(function getUserById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userRef = db.collection('users').doc(id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(userRef.get());

        case 4:
          doc = _context3.sent;

          if (doc.exists) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", {
            status: 404,
            message: 'User not found'
          });

        case 7:
          return _context3.abrupt("return", {
            status: 200,
            data: _objectSpread({
              id: doc.id
            }, doc.data())
          });

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            status: 500,
            message: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUserById: getUserById
};