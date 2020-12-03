const express = require('express');
const UserSchema = require('../models/userModel');
const router = express.Router();

//Get all users
router.get('/', async (req, res) => {
    let users = await UserSchema.find();
    if (!users || users.length == 0) res.send('No Users.');
    else res.send(users);
});

//Get user by id
router.get('/getById/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let user = await UserSchema.findById(id);
            res.send({ user });
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send('User is missing ID.');
    }
});

//Add user
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let user = new UserSchema(req.body);
        await user.save();
        res.send('User added successfully.');
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Update user
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            console.log(req.body);
            let updatedUser = await UserSchema.findOneAndUpdate({ _id: id }, req.body);
            if (updatedUser) {
                res.send('User updated successfully.');
            }
            else {
                res.status(400).send({ error: 'Could not update the user.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    else {
        res.status(400).send({ error: 'User is missing ID.' });
    }
});

//Delete user
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let deletedUser = await UserSchema.deleteOne({ _id: id });

            if (deletedUser.deletedCount) {
                res.send('User deleted successfully.');
            }
            else {
                res.status(400).send({ error: 'Could not delete the user.' });
            }
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.status(400).send({ error: 'User is missing ID.' });
    }
});

//Export module
module.exports = router;