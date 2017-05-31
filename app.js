// Dependencies
// Cors Allows Requests to API from different Domain
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config/database');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' +config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' +err);
});

const app = express();

const users = require('./routes/users');

// Port
const port = process.env.PORT || 8080;

// Cors Middleware
app.use(cors());

// Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middelware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});