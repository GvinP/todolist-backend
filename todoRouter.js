const Router = require("express");
const controller = require('./todoController.js')
const authMiddleware = require('./middlewares/authMiddleware')

const todoRouter = new Router()

todoRouter.post('/', authMiddleware, controller.addTodo)
todoRouter.get('/', authMiddleware, controller.getTodo)
todoRouter.delete('/:todoId', authMiddleware, controller.deleteTodo)
todoRouter.put('/:todoId', authMiddleware, controller.updateTodo)
todoRouter.post(`/:todoId/tasks`, authMiddleware, controller.addTask)
todoRouter.get(`/:todoId/tasks`, authMiddleware, controller.getTask)
todoRouter.delete(`/:todoId/tasks/:taskId`, authMiddleware, controller.deleteTask)
todoRouter.put(`/:todoId/tasks/:taskId`, authMiddleware, controller.updateTask)

module.exports = todoRouter