const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// Định nghĩa các route cho CRUD
router.get('/getModulesAll', moduleController.getAllModules);
router.get('/getModulesId/:id', moduleController.getModuleById);
router.post('/createModules', moduleController.createModule);
router.put('/updateModules/:id', moduleController.updateModule);
router.delete('/deleteModules/:id', moduleController.deleteModule);

module.exports = router;
