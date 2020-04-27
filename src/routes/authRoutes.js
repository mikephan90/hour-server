const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const user = new User({ email, password, username });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(422).send({ error: 'Must provide email and password.' });
    }

    const user = await User.findOne({ username });
    if (!user) { 
        return res.status(404).send({ error: 'Invalid username or password.' });
    }

    try { 
        await user.comparePassword(password); 
        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) { 
        return res.status(422).send({ error: 'Invalid username or password.a' });
    }
});

module.exports = router;