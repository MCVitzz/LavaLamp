const express = require('express');

const router = express.Router();

//Get Members
router.get('/', (req, res) => {
    const members = getMembers();
    res.send(members);
});

//Add Members
router.post('/', (req, res) => {
    const members = getMembers();
    members.push({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email
    });
    res.status(201).send();
    console.log(req.body);
});

//Delete Members
router.delete('/:id', (req, res) => {
    const members = getMembers();
    members.pop();
    console.log(req.params.id)
    console.log(members);
    res.status(200).send();
});


module.exports = router;