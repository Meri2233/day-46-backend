//title, description, price, seller(user id),category(category id),interestedbuyers[],buyer

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sellerId: {
        type: String,
        ref: 'User',
        required:true
    },
    category: {
        type: String,
        ref: 'Category',
        required: true
    },
    buyers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    closedAt: {
        type: Date
    },
    interestedbuyers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    imageUrl:String
});

const AdModel = mongoose.model('Ad', adSchema);
module.exports = AdModel