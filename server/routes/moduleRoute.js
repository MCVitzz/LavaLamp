const express = require('express');
const ModuleSchema = require('../models/moduleModel');
const router = express.Router();

//Get all tasks
router.get('/', async (req, res) => {
    let modules = await ModuleSchema.find();
    if (!modules || modules.length == 0) res.send('No Modules.');
    else res.send(modules);
});

//Get module by id
router.get('/getById/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let module = await ModuleSchema.findById(id);
            res.send({ module });
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Module is missing ID.');
    }
});

//Add module
router.post('/', async (req, res) => {
    try {
        let module = new ModuleSchema(req.body);
        await module.save();
        res.send('Module added successfully.');
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update module
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedModule = await ModuleSchema.findOneAndUpdate({ _id: id }, req.body);
            if (updatedModule) {
                res.send('Module updated successfully.');
            }
            else {
                res.status(400).send({ error: 'Could not update the module.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Module is missing ID.' });
    }
});

//Delete module
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedModule = await ModuleSchema.deleteOne({ _id: id });

            if (deletedModule.deletedCount) {
                res.send('Module deleted successfully.');
            }
            else {
                res.status(400).send({ error: 'Could not delete the module.' });
            }
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Module is missing ID.' });
    }
});


//Export module
module.exports = router;