const express = require('express');
const Addresses = require('../services/addressServices');
const router = express.Router();

//Get all addresses
router.get('/', async (req, res) => {
    let addresses = await Addresses.getAll();
    if (!addresses || addresses.length == 0) res.send('No Addresses.');
    else res.send(addresses);
});

//Get address by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let address = await Addresses.getById(id);
            if (!address.id) res.send('No Address found.');
            else res.send(address);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('Address is missing ID.');
    }
});

//Add address
router.post('/', async (req, res) => {
    try {
        let address = await Addresses.create(req.body);
        res.send(address);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

//Update address
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let updatedAddress = await Addresses.update(id, req.body);
            if (updatedAddress) {
                res.send(updatedAddress);
            }
            else {
                res.status(400).send({ error: 'Could not update the address.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'Address is missing ID.' });
    }
});

//Delete address
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedTeam = await Addresses.delete(id);
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
        res.status(400).send({ error: 'Address is missing ID.' });
    }
});

//Export module
module.exports = router;