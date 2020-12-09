const express = require('express');
const Users = require('../services/userServices');
const router = express.Router();

//Get all users
router.get('/', async (req, res) => {
    let users = await Users.getAll();
    if (!users || users.length == 0) res.send('No Users.');
    else res.send(users);
});

//Get user by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let user = await Users.getByTeam(id);
            if (!user.id) res.send('No User found.');
            else res.send(user);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('User is missing ID.');
    }
});

//Get by Team
router.get('/getByTeam/:id', async (req, res) => {
    let moduleId = req.params.id;
    if (moduleId) {
        try {
            let users = await Users.getByTeam(moduleId);
            if (!users[0].id) res.send('No Users.');
            else res.send(users);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('User is missing ID.');
    }

});

//Add user
router.post('/', async (req, res) => {
    try {
        if (!req.body.state) req.body.state = 'Unassigned';
        let user = await Users.create(req.body);
        res.send(`User created with Id ${user.id}.`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update user
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedUser = await Users.update(id, req.body);
            if (updatedUser) {
                res.send(updatedUser);
            }
            else {
                res.status(400).send({ error: 'Could not update the user.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'User is missing ID.' });
    }
});

//Delete user
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedUser = await Users.delete(id);
            res.send(deletedUser);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'User is missing ID.' });
    }
});

//Export module
module.exports = router;