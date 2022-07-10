const Router = require("express");
const controller = require('./todoController.js')
const authMiddleware = require('./middlewares/authMiddleware')

const todoRouter = new Router()

todoRouter.post('/', controller.addTodo)
todoRouter.get('/', authMiddleware, controller.getTodo)
todoRouter.post(`/:todoId/tasks`, controller.addTask)
todoRouter.get(`/:todoId/tasks`, authMiddleware, controller.getTask)
todoRouter.delete(`/:todoId/tasks/:taskId`, controller.deleteTask)
todoRouter.put(`/:todoId/tasks/:taskId`, controller.updateTask)

module.exports = todoRouter