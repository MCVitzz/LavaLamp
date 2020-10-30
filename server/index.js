const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const members = require('./routes/api/members');
app.use('/api/members', members);

//Production Environment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname, + '/public/'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));