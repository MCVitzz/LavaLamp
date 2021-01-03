const express = require('express');
const Teams = require('../services/teamServices');
const router = express.Router();

//Get all teams
router.get('/', async (req, res) => {
    let teams = await Teams.getAll();
    if (!teams || teams.length == 0) res.send('No Teams.');
    else res.send(teams);
});

//Get team by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let team = await Teams.getById(id);
            if (!team.id) res.send('No Team found.');
            else res.send(team);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Team is missing ID.');
    }
});

//Add team
router.post('/', async (req, res) => {
    try {
        let team = await Teams.create(req.body);
        res.send(`Team created with Id ${team.id}.`);
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
            let updatedTeam = await Teams.update(id, req.body);
            if (updatedTeam) {
                res.send(updatedTeam);
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
        res.status(400).send({ error: 'Team is missing ID.' });
    }
});

//Delete team
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedTeam = await Teams.delete(id);
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
        res.status(400).send({ error: 'Team is missing ID.' });
    }
});

//Export module
module.exports = router;