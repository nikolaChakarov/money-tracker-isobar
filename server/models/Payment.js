const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    transaction: {
        type: Number
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;