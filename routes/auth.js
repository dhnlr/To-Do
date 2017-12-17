var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


/* GET home page. */
router.get('/signup', userController.createUser)
router.post('/signin', userController.getUser)

module.exports = router;
