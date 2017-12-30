const router = require('express').Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth.js');
const author = require('../middlewares/author.js');

router.get('/', auth, todoController.getTodo);
router.get('/:id', auth, author, todoController.getTodoId);
router.post('/add', auth, todoController.createTodo);
router.put('/:id', auth, author, todoController.updateTodo);
router.put('/complete/:id', auth, author, todoController.completeTodo);
router.delete('/:id', auth, author, todoController.deleteTodo);

module.exports = router;