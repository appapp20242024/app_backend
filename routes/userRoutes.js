const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getAllUsers', userController.getAllUsers);

router.post('/createUser', userController.createUser);

router.delete('/deleteUser/:id', userController.deleteUser);


router.put('/updateUser', userController.updateUser);
module.exports = router;