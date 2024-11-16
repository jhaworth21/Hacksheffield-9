require ('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-openid-connect');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

const auth_config = {
    authRequired: false,
    auth0Logout: true,
    secret: '744ac41437170dce474acb1bdc59d4379028ebabb767df49211a4ce2bc3e92f1',
    baseURL: 'http://localhost:5173',
    clientID: '93ajc3U7fnprGkkgZ5d8LPkLAfmfsNg5',
    issuerBaseURL:'https://dev-s5ynupfjsplm2b3x.us.auth0.com'
  };

  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(auth_config));

// app.use(express.static(path.join(__dirname, "public")));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated())
    res.send('Hello World!');
});

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const usersRouters = require('./routes/users.js');
const tasksRouters = require('./routes/tasks.js');
app.use('/api/users', usersRouters);
app.use('/api/tasks', tasksRouters);

const loggedinRouter = require('./routes/isloggedin.js');
app.use('/api/isloggedin', loggedinRouter);

app.listen(port, () => console.log(`Server is running on port`, port));
