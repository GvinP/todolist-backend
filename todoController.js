const Todo = require("./models/Todo.js");
const Task = require("./models/Task.js");

class TodoController {
    async addTodo(req, res) {
        try {
            const {title} = req.body
            // const userId = req.user.id
            const todo = new Todo({userId: '62c6e23ae38bc43686842a9a', title})
            await todo.save()
            res.json(todo)
        } catch (e) {
            res.status(400).json({message: 'Todo error'})
        }
    }

    async getTodo(req, res) {
        try {
            const todos = await Todo.find() //{userId: req.user.id}
            res.json(todos)
        } catch (e) {
            res.status(400).json({message: 'Todo error'})
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
            console.log(taskId)
            await Task.deleteOne({_id: taskId})
            // const task = new Task({todoId: todoId, title})
            // await task.save()
            res.json('Task deleted')
        } catch (e) {
            res.status(400).json({message: 'Task error'})
        }
    }
    async updateTask(req, res) {
        try {
            const taskId = req.params.taskId
            const {title} = req.body
            console.log(title)
            console.log(taskId)
            const updatedTask = await Task.updateOne({_id: taskId}, {title})
            console.log(updatedTask)
            res.json('Task updated')
        } catch (e) {
            res.status(400).json({message: 'Task update error'})
        }
    }
}

module.exports = new TodoController()