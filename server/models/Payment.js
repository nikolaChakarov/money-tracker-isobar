const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    name: {
        type: String
    },

    amount: {
        type: Number
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;