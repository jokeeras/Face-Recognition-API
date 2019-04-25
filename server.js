const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@yahoo.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

// ROOT
app.get('/', (req, res) => {
    res.send(database.users);
})

// SIGN IN
app.post('/signin', (req,res) => {
    bcrypt.compare("apples", '$2a$10$8eiG0FzHFugSAwuRErUHD..3.JiyQcuohTkNFMKk1SkTIlPUljSuq', function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$8eiG0FzHFugSAwuRErUHD..3.JiyQcuohTkNFMKk1SkTIlPUljSuq', function(err, res) {
        console.log('second guess', res)
        
    });

    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('succes');
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
        password: password,
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




app.listen(3000, () => {
    console.log('app is running on port 3000')
})




/* 
/ --> res = this is working
/singin --> POST = succes/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/