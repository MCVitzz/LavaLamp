const express = require('express');
const TeamUsers = require('../services/teamUserServices');
const router = express.Router();

//Get all teamUsers
router.get('/', async (req, res) => {
    let teamUsers = await TeamUsers.getAll();
    if (!teamUsers || teamUsers.length == 0) res.send('No TeamUsers.');
    else res.send(teamUsers);
});

//Get by Team
router.get('/getByTeam/:id', async (req, res) => {
    let teamId = req.params.id;
    if (teamId) {
        try {
            let teamUsers = await TeamUsers.getByTeam(teamId);
            if (!teamUsers[0].team) res.send('No TeamUsers.');
            else res.send(teamUsers);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('TeamUser is missing ID.');
    }

});

//Get by User
router.get('/getByUser/:id', async (req, res) => {
    let userId = req.params.id;
    if (userId) {
        try {
            let teamUsers = await TeamUsers.getByUser(userId);
            if (!teamUsers[0].user) res.send('No TeamUsers.');
            else res.send(teamUsers);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('TeamUser is missing ID.');
    }

});

//Get teamUser by id
router.get('/:teamId/:userId', async (req, res) => {
    let teamId = req.params.teamId;
    let userId = req.params.userId;
    if (teamId && userId) {
        try {
            let teamUser = await TeamUsers.getById(userId, teamId);
            if (!teamUser.id) res.send('No TeamUser found.');
            else res.send(teamUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('TeamUser is missing ID.');
    }
});

//Add teamUser
router.post('/', async (req, res) => {
    try {
        let teamUser = await TeamUsers.create(req.body);
        res.send(`TeamUser created with Id ${teamUser.id}.`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update teamUser
router.put('/:teamId/:userId', async (req, res) => {
    let teamId = req.params.teamId;
    let userId = req.params.userId;
    if (teamId && userId) {
        try {
            let updatedTeamUser = await TeamUsers.update(teamId, userId, req.body);
            if (updatedTeamUser) {
                res.send(updatedTeamUser);
            }
            else {
                res.status(400).send({ error: 'Could not update the teamUser.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'TeamUser is missing ID.' });
    }
});

//Delete by Team
router.delete('/deletebyTeam/:teamId', async (req, res) => {
    let teamId = req.params.teamId;
    if (teamId) {
        try {
            let deletedTeamUser = await TeamUsers.deleteByTeam(teamId);
            res.send(deletedTeamUser);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'TeamUser is missing ID.' });
    }
});

//Delete by User
router.delete('/deletebyUser/:teamId', async (req, res) => {
    let teamId = req.params.teamId;
    if (teamId) {
        try {
            let deletedTeamUser = await TeamUsers.deleteByUser(teamId);
            res.send(deletedTeamUser);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'TeamUser is missing ID.' });
    }
});

//Delete teamUser
router.delete('/:teamId/:userId', async (req, res) => {
    let teamId = req.params.teamId;
    let userId = req.params.userId;
    if (teamId && userId) {
        try {
            let deletedTeamUser = await TeamUsers.delete(teamId, userId);
            res.send(deletedTeamUser);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'TeamUser is missing ID.' });
    }
});

//Export module
module.exports = router;