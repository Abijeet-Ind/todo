const express = require('express');
const router = express.Router();

const todoController = require('./../controller/todoController');

router.post('/create', todoController.create);
router.patch('/completedTodo/:todo/:email', todoController.update);
router.get('/findall/:email', todoController.DisplayAll);
router.delete('/delete/:deleteItem/:email', todoController.deleteTodo)
router.get('/detail/:email/:query', todoController.displayOne)

module.exports = router;