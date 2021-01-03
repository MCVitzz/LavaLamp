const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('./models/database');

const app = express();

//Config variables and server port
const port = process.env.PORT || 5000;
dotenv.config();

//Connect to Database
Database.setConnection({
    host: process.env.URL,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.all('*', require('./verifyToken'));

app.use('/api/members', require('./routes/memberRoute'));
app.use('/api/tasks', require('./routes/taskRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/modules', require('./routes/moduleRoute'));
app.use('/api/teams', require('./routes/teamRoute'));
app.use('/api/addresses', require('./routes/addressRoute'));
app.use('/api/teamUsers', require('./routes/teamUserRoute'));
app.use('/api/projects', require('./routes/projectRoute'));
app.use('/api/projectUsers', require('./routes/projectUserRoute'));
app.use('/api/authentication', require('./routes/authenticationRoute'));

// Production Environment
app.use(serveStatic(__dirname + '/public'));

app.listen(port, () => console.log(`Server started on port ${port}`));