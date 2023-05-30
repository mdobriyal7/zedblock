const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(todoController.getAllTodos)
    .get(todoController.getTodoById)
    .post(todoController.createTodo)
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo)

module.exports = router