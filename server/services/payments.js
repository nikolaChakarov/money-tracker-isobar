const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Payment = require('../models/Payment');
const User = require('../models/User');

const isAuth = require('../middlewares/isAuth');

// Get current user transactions
router.get('/', isAuth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).populate('payments');

        res.status(200).json(user.payments);

    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err });
    }
});

// Add transaction
router.post('/add', isAuth, async (req, res) => {


    try {

        // Get current user
        const user = await User.findById(req.user.id);

        // Make transaction
        const transaction = new Payment({ transaction: req.body.transaction });
        await transaction.save();

        // Add currentTransacion to currentUser
        user.payments.push(transaction);

        await user.save();

        const userTransactions = await User
            .findById(req.user.id)
            .populate('payments');


        res.status(200).json(userTransactions);

    } catch (err) {
        console.error(err);

        res.status(400).json({ msg: err });
    }

});

// Delete transaction
router.delete('/del/:id', isAuth, async (req, res) => {

    try {
        // Remove current transaction from all transactions
        let dbRes = await Payment.findOneAndRemove({ _id: req.params.id });
        console.log(dbRes);

        // Remove currentTransaction from user's array
        const user = await User.findById(req.user.id);

        let userPayments = user.payments.filter(el => el != req.params.id);

        await User.findOneAndUpdate({ _id: req.user.id }, { payments: userPayments }, { new: true });

        userPayments = await User.findById(req.user.id).populate('payments');

        res.status(200).json(userPayments)

    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err });
    }

});

module.exports = router;