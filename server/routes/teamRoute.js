const express = require('express');
const TeamSchema = require('../models/teamModel');
const router = express.Router();

//Get all teams
router.get('/', async (req, res) => {
    let teams = await TeamSchema.find();
    if (!teams || teams.length == 0) res.send('No Teams.');
    else res.send(teams);
});

//Get team by id
router.get('/getById/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let team = await TeamSchema.findById(id);
            res.send({ team });
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
        if (!req.body.state) req.body.state = 'Unassigned';
        let team = new TeamSchema(req.body);
        await team.save();
        res.send('Team added successfully.');
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
            console.log(req.body);
            let updatedTeam = await TeamSchema.findOneAndUpdate({ _id: id }, req.body);
            if (updatedTeam) {
                res.send('Team updated successfully.');
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
            let deletedTeam = await TeamSchema.deleteOne({ _id: id });

            if (deletedTeam.deletedCount) {
                res.send('Team deleted successfully.');
            }
            else {
                res.status(400).send({ error: 'Could not delete the team.' });
            }
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Team is missing ID.' });
    }
});

//Export module
module.exports = router;