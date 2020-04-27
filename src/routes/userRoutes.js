
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const User = mongoose.model('User');

mongoose.set('useFindAndModify', false);

const router = express.Router();

router.use(requireAuth);

router.get('/bookmarks', async (req, res) => {
    const data = req.user.bookmarks;
    //const data = await User.find({ bookmarks: req.user._id });
    res.send(data);
});

router.get('/user', async (req, res) => {
    const data = req.user;
    res.send(data);
});


// NEED TO PREVENT ADDING SAME BOOKMARK - CAUSING BUGS.
// DOES NOT ADD TO ARRAY THOUGH
router.route('/addbookmark').post(function(req, res) {
    const bookmarked = req.body.bookmarked;
    console.log(req.body.bookmarked)
    User.updateOne(
        { _id: req.user._id },
        { $addToSet: { bookmarks:  bookmarked }},
        function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.send(result);
            }
        } 
    );
});

router.route('/removebookmark').post(function(req, res) {
    const index = req.body.bookmarked;
    User.updateOne(
        { _id: req.user._id },
        { $pull: { bookmarks: { id : index }}},
        { multi: true },
        function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

module.exports = router;