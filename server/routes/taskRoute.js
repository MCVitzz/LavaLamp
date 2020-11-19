const express = require('express');
const TaskSchema = require('../models/taskModel');
const router = express.Router();

//Get all tasks
router.get('/', async (req, res) => {
    let tasks = await TaskSchema.find();
    if (!tasks || tasks.length == 0) res.send('No Tasks.');
    else res.send(tasks);
});

//Get task by id
router.get('/getById/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let task = await TaskSchema.findById(id);
            res.send({ task });
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
router.post('/add', async (req, res) => {
    try {
        if (!req.body.state) req.body.state = 'Unassigned';
        let task = new TaskSchema(req.body);
        await task.save();
        res.send('Task added successfully.');
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update task
router.put('/update/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            console.log(req.body);
            let updatedTask = await TaskSchema.findOneAndUpdate({ _id: id }, req.body);
            if (updatedTask) {
                res.send('Task updated successfully.');
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
router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedTask = await TaskSchema.deleteOne({ _id: id });

            if (deletedTask.deletedCount) {
                res.send('Task deleted successfully.');
            }
            else {
                res.status(400).send({ error: 'Could not delete the task.' });
            }
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Task is missing ID.' });
    }
});

//Export module
module.exports = router;