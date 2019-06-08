const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      //port: '3001',
      user : 'postgres',
      password : 'theevil', // ADD PASS
      database : 'smart-brain'
    }
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROOT
app.get('/', (req, res) => {res.send(database.users);})

// SIGN IN
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// PROFILE
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// IMAGE
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3001, () => {
    console.log('App is running on port: ${process.env.PORT}')
})

/* 
/ --> res = this is working
/singin --> POST = succes/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/