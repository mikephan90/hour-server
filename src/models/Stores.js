const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeID: String, // ID to store reviews
    userRatings: {
        type: Number,
        default: [],
    },
    happyHourItems: {
        item: {
            name: String,
            price: Number
        }
    },
    reviews: { 
        type: Object,
        reviewPost: {
            username: String,
            context: String,
        },
        default: []
    }
});

mongoose.model('Store', storeSchema);