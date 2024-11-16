require ('dotenv').config()
const express = require('express');
const { auth } = require('express-openid-connect');
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;

const auth_config = {
    authRequired: false,
    auth0Logout: true,
    secret: '744ac41437170dce474acb1bdc59d4379028ebabb767df49211a4ce2bc3e92f1',
    baseURL: 'http://localhost:3000',
    clientID: '93ajc3U7fnprGkkgZ5d8LPkLAfmfsNg5',
    issuerBaseURL:'https://dev-s5ynupfjsplm2b3x.us.auth0.com'
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(auth_config));

// app.use(express.static(path.join(__dirname, "public")));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send('Hello World!');
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(port, () => console.log(`Server is running on port`, port));

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const usersRouters = require('./routes/users.js')
const tasksRouters = require('./routes/tasks.js')  
app.use('/users', usersRouters)
app.use('/users', tasksRouters)
