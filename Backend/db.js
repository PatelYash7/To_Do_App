const mongoose = require('mongoose');
console.log("Hello")
mongoose.connect('mongodb+srv://YashPatel:AeBoESyIRTTZECRK@testing.xc0jpsk.mongodb.net/todos')
console.log("Hello2")

const todoschema= mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo = mongoose.model('todo',todoschema)

module.exports ={
    todo
}