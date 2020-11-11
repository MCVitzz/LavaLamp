const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

//Config variables and server port
const port = process.env.PORT || 5000;
dotenv.config();

//Config mongoose
mongoose.set('useFindAndModify', false);

//Connect to database
mongoose.connect(
    process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.error(err);
        console.error('Could not connect to database, check log above');
    }
    else
        console.log('Connected to Database');
});

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/members', require('./routes/memberRoute'));
app.use('/api/tasks', require('./routes/taskRoute'));

// Production Environment
app.use(serveStatic(__dirname + '/public'));

app.listen(port, () => console.log(`Server started on port ${port}`));