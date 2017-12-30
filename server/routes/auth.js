var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.post('/signin', userController.signIn)

module.exports = router;
