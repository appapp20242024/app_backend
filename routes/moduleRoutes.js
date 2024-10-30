const express = require('express');
const router = express.Router();
const { searchModules } = require('../controllers/moduleController'); // Đảm bảo đường dẫn đúng

router.post('/search', searchModules);

module.exports = router;
