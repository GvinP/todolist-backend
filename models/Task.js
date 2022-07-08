const {Schema, model} = require("mongoose");

const Task = new Schema({
    todoId: {type: String, required: true},
    title: {type: String, required: true},
})

module.exports = model('Task', Task)