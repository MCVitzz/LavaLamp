const express = require('express');
const Tasks = require('../services/taskServices');
const router = express.Router();

//Get all tasks
router.get('/', async (req, res) => {
    let tasks = await Tasks.getAll();
    if (!tasks || tasks.length == 0) res.send('No Tasks.');
    else res.send(tasks);
});

//Get task by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let task = await Tasks.getById(id);
            if (!task.id) res.send('No Task found.');
            else res.send(task);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Task is missing ID.');
    }
});

//Add task
router.post('/', async (req, res) => {
    try {
        if (!req.body.state) req.body.state = 'Unassigned';
        let task = await Tasks.create(req.body);
        res.send(`Task created with Id ${task.id}.`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update task
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedTask = await Tasks.update(id, req.body);
            if (updatedTask) {
                res.send(updatedTask);
            }
            else {
                res.status(400).send({ error: 'Could not update the task.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Task is missing ID.' });
    }
});

//Delete task
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedTask = await Tasks.delete(id);
            res.send(deletedTask);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Task is missing ID.' });
    }
});

router.get('/getByModule/:id', async (req, res) => {
    let moduleId = req.params.id;
    if (moduleId) {
        try {
            let tasks = await Tasks.getByModule(moduleId);
            if (!tasks[0].id) res.send('No Tasks.');
            else res.send(tasks);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Module is missing ID.');
    }

});

//Export module
module.exports = router;