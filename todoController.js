const Todo = require("./models/Todo.js");
const Task = require("./models/Task.js");

class TodoController {
    async addTodo(req, res) {
        try {
            const {title} = req.body
            const userId = req.user.id
            const todo = new Todo({userId, title})
            await todo.save()
            res.json(todo)
        } catch (e) {
            res.status(400).json({message: 'Todo error'})
        }
    }

    async getTodo(req, res) {
        try {
            const userId = req.user.id
            const todos = await Todo.find({userId}) //{userId: req.user.id}
            res.json(todos)
        } catch (e) {
            res.status(400).json({message: 'Todo error'})
        }
    }

    async deleteTodo(req, res) {
        try {
            const todoId = req.params.todoId
            await Task.deleteMany({todoId})
            await Todo.deleteOne({_id: todoId})
            res.json('Todo deleted')
        } catch (e) {
            res.status(400).json({message: 'Todo delete error'})
        }
    }
    async updateTodo(req, res) {
        try {
            const todoId = req.params.todoId
            const {title} = req.body
            if (title) {
                await Todo.updateOne({_id: todoId}, {title})
            }
            res.json('Todo updated')
        } catch (e) {
            res.status(400).json({message: 'Todo update error'})
        }
    }
    async getTask(req, res) {
        try {
            const todoId = req.params.todoId
            const tasks = await Task.find({todoId: todoId})
            res.json(tasks)
        } catch (e) {
            res.status(400).json({message: 'Task error'})
        }
    }
    async addTask(req, res) {
        try {
            const {title} = req.body
            const todoId = req.params.todoId
            const task = new Task({todoId: todoId, title})
            await task.save()
            res.json(task)
        } catch (e) {
            res.status(400).json({message: 'Task error'})
        }
    }
    async deleteTask(req, res) {
        try {
            const taskId = req.params.taskId
            await Task.deleteOne({_id: taskId})
            res.json('Task deleted')
        } catch (e) {
            res.status(400).json({message: 'Task error'})
        }
    }
    async updateTask(req, res) {
        try {
            const taskId = req.params.taskId
            const {title} = req.body
            const {status} = req.body
            if (title) {
                await Task.updateOne({_id: taskId}, {title})
            }
            if (status) {
                await Task.updateOne({_id: taskId}, {status})
            }
            res.json('Task updated')
        } catch (e) {
            res.status(400).json({message: 'Task update error'})
        }
    }
}

module.exports = new TodoController()