const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', userController.getUser);
router.get('/:id', userController.getUserId);
router.post('/add', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
