const router = require('express').Router();
const todoController = require('../controllers/todoController')

router.get('/', todoController.getTodo);
router.get('/:id', todoController.getTodoId);
router.post('/add', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;