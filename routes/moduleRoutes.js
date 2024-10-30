const express = require('express');
const router = express.Router();

const { searchModules } = require('../controllers/moduleController'); // Đảm bảo đường dẫn đúng

router.post('/search', searchModules);

const moduleController = require('../controllers/moduleController');

// Định nghĩa các route cho CRUD
router.get('/getModulesAll', moduleController.getAllModules);
router.get('/getModulesId/:id', moduleController.getModuleById);
router.post('/createModules', moduleController.createModule);
router.put('/updateModules/:id', moduleController.updateModule);


module.exports = router;
