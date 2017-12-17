const router = require('express').Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth.js');
const author = require('../middlewares/author.js');

router.get('/', auth, author, todoController.getTodo);
router.get('/:id', auth, author, todoController.getTodoId);
router.post('/add', auth, author, todoController.createTodo);
router.put('/:id', auth, author, todoController.updateTodo);
router.delete('/:id', auth, author, todoController.deleteTodo);

module.exports = router;