const {Schema, model} = require("mongoose");

const Todo = new Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
})

module.exports = model('Todo', Todo)