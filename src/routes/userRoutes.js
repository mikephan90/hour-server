
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Bookmark = mongoose.model('Bookmark');

const router = express.Router();

router.use(requireAuth);

router.get('/bookmarks', async (req, res) => {
    const bookmarks = await Bookmark.find({ userId: req.user._id });
    res.send(bookmarks);
});

router.post('/bookmarks', async (req, res) => {
    const { bID } = req.body;
    console.log(req.body)
    if ( !bID ) {
        return res
        .status(422)
        .send({ error: 'You must provide a bookmark.' });
    }
    try {
        const bookmarked = new Bookmark({ bID, userId: req.user._id });
        await bookmarked.save();
        res.send(bookmarked);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;