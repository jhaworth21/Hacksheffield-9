const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const usersRouter = require("./routes/users.js");
const tasksRouter = require("./routes/tasks.js");
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);


app.listen(3000, () => console.log('Server Started'));