const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');

// Định nghĩa các route cho CRUD directories
router.get('/getDirectoriesAll', directoryController.getAllDirectories);
router.get('/getDirectoriesId/:id', directoryController.getDirectoryById);
router.post('/createDirectories', directoryController.createDirectory);
router.put('/updateDirectories/:id', directoryController.updateDirectory);
router.delete('/deleteDirectories/:id', directoryController.deleteDirectory);

module.exports = router;
