const express = require('express');
const router = express.Router();

const Item = require('../../models/User');

router.get('/', (req,res) => {
    Item.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(404).json({noitemsfound: 'No Items found'}));
});
router.get('/:id', (req,res) => {
    Item.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(404).json({noitemfound: 'No Item found'}));
});
router.post('/', (req,res) => {
    Item.create(req.body)
        .then((user) => res.json({msg: 'Item Added successfully'}))
        .catch((err) => res.status(400).json({error: 'Unable To Add This Item'}));
});
router.put('/:id', (req,res) => {res.send('testing get /:id item route')});

module.exports = router;



