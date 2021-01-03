const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../services/userServices');

router.post('/login', async (req, res) => {
    //Check if email exists
    const user = await Users.getByEmail(req.body.email);
    if (!user.id) return res.status(400).send('Email or password is wrong.');

    //Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    //Create and assign token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
});

router.post('/register', async (req, res) => {
    //Check if duplicate email
    const emailExist = await Users.getByEmail(req.body.email);
    if (emailExist.id) return res.status(400).send('Email already exists.');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Creating User
    const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
    };

    //Save to Database
    try {
        const savedUser = Users.create(user);
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/encrypt/:password', async (req, res) => {
    let password = req.params.password;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    res.send(hashPassword);
});

module.exports = router;