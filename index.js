const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const authRouter = require("./authRouter.js");
const todoRouter = require("./todoRouter.js");
const cors = require('cors')

const PORT = process.env.PORT || 80
const password = 'dVwCN91T6x4IuQ2H'
const DB_URL = `mongodb+srv://gvinpin:${password}@cluster0.ifctz.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use(cors())
app.use('/todo-lists', todoRouter)
app.use('/auth', authRouter)


const start = () => {
    try {
        app.listen(PORT, async ()=>{
            await mongoose.connect(DB_URL)
            console.log(`server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}

start()