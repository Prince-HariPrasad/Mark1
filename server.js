const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/Mark1')
const db =mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successul")
})

const userSchema = new mongoose.Schema({
    name : String,
    phone_no : String,
    email : String,
    msg : String
})

const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async(req,res)=>{
    const {name,phone_no,email,msg} = req.body
    const user = new Users({
        name,
        phone_no,
        email,
        msg
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Succuss")
})

app.listen(port,()=>{
    console.log("Server Started")
})