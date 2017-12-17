const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth.js');
const isuser = require('../middlewares/isuser.js');

/* GET users listing. */
router.get('/', auth, isuser, userController.getUser);
router.get('/:id', auth, isuser, userController.getUserId);
router.post('/add', auth, isuser, userController.createUser);
router.put('/:id', auth, isuser, userController.updateUser);
router.delete('/:id', auth, isuser, userController.deleteUser);

module.exports = router;
