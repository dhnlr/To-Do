const router = require('express').Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth.js');

router.get('/', auth, todoController.getTodo);
router.get('/:id', auth, todoController.getTodoId);
router.post('/add', auth, todoController.createTodo);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);

module.exports = router;