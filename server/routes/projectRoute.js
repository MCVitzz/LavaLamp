const express = require('express');
const Projects = require('../services/projectServices');
const router = express.Router();

//Get all projects
router.get('/', async (req, res) => {
    let projects = await Projects.getAll();
    if (!projects || projects.length == 0) res.send('No Projects.');
    else res.send(projects);
});

//Get project by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let project = await Projects.getById(id);
            if (!project.id) res.send('No Project found.');
            else res.send(project);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Project is missing ID.');
    }
});

//Add project
router.post('/', async (req, res) => {
    try {
        let project = await Projects.create(req.body);
        res.send(`Project created with Id ${project.id}.`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update project
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedProject = await Projects.update(id, req.body);
            if (updatedProject) {
                res.send(updatedProject);
            }
            else {
                res.status(400).send({ error: 'Could not update the project.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Project is missing ID.' });
    }
});

//Delete project
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedProject = await Projects.delete(id);
            res.send(deletedProject);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Project is missing ID.' });
    }
});

//Export module
module.exports = router;