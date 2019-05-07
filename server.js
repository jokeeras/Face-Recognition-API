const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@yahoo.com',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(cors());
app.use(bodyParser.json());

// ROOT
app.get('/', (req, res) => {
    res.send(database.users);
})

// SIGN IN
app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error logging in');
        }
})

// REGISTER
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

// PROFILE
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
})

// IMAGE
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
})




app.listen(3001, () => {
    console.log('app is running on port 3001')
})




/* 
/ --> res = this is working
/singin --> POST = succes/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/