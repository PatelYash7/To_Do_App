const express = require('express');
const {createtodo,updatetodo} = require('./types');
const { todo } = require('./db');

const app = express();
const port =3000;

app.use(express.json());

app.post('/todos',async (req,res)=>{
    const payload= req.body
    const parsedPayload= createtodo.safeParse(payload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs",
        })
        return;
    }
    await todo.create({
        title:parsedPayload.data.title,
        description:parsedPayload.data.description,
        completed:false
    })
    res.json({
        msg:"Todo-Created"
    })
})


app.get('/todos',async (req,res)=>{
    const todos=await todo.find();
    res.json({
        todos
    })

})


app.put('/completed',async (req,res)=>{
    const payload= req.body;
    const parsedpayload=updatetodo.safeParse(payload);

    if(!parsedpayload.success){
        res.status(411).json({
            msg:"You have passed the wrong inputs"
        })
        return
    }

    await todo.findOneAndUpdate({
        _id: req.body.id
    }, {
      completed: true  
    })

    res.json({
        msg:"Todo Mark as done"
    })
})
app.listen(port,()=>{
    console.log("App is Listening On Port number 3000")
})