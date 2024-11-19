// import packages
const express = require('express');
const MYSQLStore = require('connect-mysql2')(session);
const path = require('path')
require('dotenv').config()

const db = require('./config/db')
const authRoutes = require('./routes/auth')
// initialize server
const app = express()

// set-up middleware
app.use(express.json())
//set-up session
app.use(
    session({
        key: 'user_sid',
        secret: proccess.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        Store: new MYSQLStore({}, db)
    })
);

//routes
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('./auth', authRoutes)
// start server
const port =proccess.env.port;

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`)

});