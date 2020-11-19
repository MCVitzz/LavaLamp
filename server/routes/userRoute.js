const express = require('express');
const UsersSchema = require('../models/usersModel');
const router = express.Router();

//Get all Users
router.get('/', async (req, res) => {
    let users = await UsersSchema.find();
    if (!users || users.length == 0) res.send('No Users.');
    else res.send(users);
});

module.exports = router;