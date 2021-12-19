const {Schema, model} = require("mongoose");

const todoSchema=new Schema({
  title: String,
  isCompleted: Boolean
})

// Model
const Todo=model('Todo',todoSchema)

module.exports = Todo