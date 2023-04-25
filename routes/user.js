const express = require('express');
const router = express.Router();
const {signupUser, loginUser} = require('../controllers/userController');
const User = require('../models/userModel')


router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/', (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.json({noUsersFound: 'no users found'}));
});
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({error: 'error updating'}));
});


module.exports = router