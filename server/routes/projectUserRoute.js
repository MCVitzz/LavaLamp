const express = require('express');
const ProjectUsers = require('../services/projectUserServices');
const router = express.Router();

//Get all projectUsers
router.get('/', async (req, res) => {
    let projectUsers = await ProjectUsers.getAll();
    if (!projectUsers || projectUsers.length == 0) res.send('No Project Users.');
    else res.send(projectUsers);
});

//Get projectUser by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let projectUser = await ProjectUsers.getById(id);
            if (!projectUser.id) res.send('No Project User found.');
            else res.send(projectUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Project User is missing ID.');
    }
});

//Get projectUser by project
router.get('/getByProject/:projectId', async (req, res) => {
    let projectId = req.params.projectId;
    if (projectId) {
        try {
            let projectUsers = await ProjectUsers.getByProject(projectId);
            if (projectUsers.length == 0) res.send('No Project User found.');
            else res.send(projectUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Project User is missing ID.');
    }
});

//Get projectUser by user
router.get('/getByUser/:projectId', async (req, res) => {
    let userId = req.params.userId;
    if (userId) {
        try {
            let projectUser = await ProjectUsers.getByUser(userId);
            if (!projectUser.length == 0) res.send('No Project User found.');
            else res.send(projectUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Project User is missing ID.');
    }
});

//Add projectUser
router.post('/', async (req, res) => {
    try {
        let projectUser = await ProjectUsers.create(req.body);
        res.send(`Project User created with Id ${projectUser.id}.`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update projectUser
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedProjectUser = await ProjectUsers.update(id, req.body);
            if (updatedProjectUser) {
                res.send(updatedProjectUser);
            }
            else {
                res.status(400).send({ error: 'Could not update the Project User.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Project User is missing ID.' });
    }
});

//Delete projectUser
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedProjectUser = await ProjectUsers.delete(id);
            res.send(deletedProjectUser);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Project User is missing ID.' });
    }
});

//Export module
module.exports = router;