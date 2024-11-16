require ('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const usersRouters = require('./routes/users.js')
const tasksRouters = require('./routes/tasks.js')  
app.use('/users', usersRouters)
app.use('/users', tasksRouters)


app.listen(3000, () => console.log('Server Started'))