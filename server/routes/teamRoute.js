const express = require('express');
const Users = require('../services/teamServices');
const router = express.Router();

//Get all teams
router.get('/', async (req, res) => {
    let teams = await Users.getAll();
    if (!teams || teams.length == 0) res.send('No Users.');
    else res.send(teams);
});

//Get team by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let team = await Users.getById(id);
            if (!team.id) res.send('No User found.');
            else res.send(team);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('User is missing ID.');
    }
});

//Add team
router.post('/', async (req, res) => {
    try {
        let team = await Users.create(req.body);
        res.send(`User created with Id ${team.id}.`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update team
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedUser = await Users.update(id, req.body);
            if (updatedUser) {
                res.send(updatedUser);
            }
            else {
                res.status(400).send({ error: 'Could not update the team.' });
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

//Delete team
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedTeam = await Users.delete(id);
            if (deletedTeam == 'Team deleted.')
                res.send(deletedTeam);
            else {
                res.status(400).send(deletedTeam);
            }
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'User is missing ID.' });
    }
});

//Export module
module.exports = router;