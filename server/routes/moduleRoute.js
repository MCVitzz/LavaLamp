const express = require('express');
const Modules = require('../services/moduleServices');
const router = express.Router();

//Get all modules
router.get('/', async (req, res) => {
    let modules = await Modules.getAll();
    if (!modules || modules.length == 0) res.send('No Modules.');
    else res.send(modules);
});

//Get module by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let module = await Modules.getById(id);
            if (!module.id) res.send('No Module found.');
            else res.send(module);
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
        let module = await Modules.create(req.body);
        res.send(`Module created with Id ${module.id}.`);
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
            let updatedModule = await Modules.update(id, req.body);
            if (updatedModule) {
                res.send(updatedModule);
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
            let deletedModule = await Modules.delete(id);
            res.send(deletedModule);
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