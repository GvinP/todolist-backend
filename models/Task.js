const {Schema, model} = require("mongoose");

const Task = new Schema({
    todoId: {type: String, required: true},
    title: {type: String, required: true},
    status: {type: Number, required: true, default: 0},
})

module.exports = model('Task', Task)