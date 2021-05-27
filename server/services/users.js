const router = require('express').Router();

const User = require('../models/User');
const config = require('../config/config');

const { validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// POST register user
router.post('/register', [
    check('username', 'username is required.').not().isEmpty(),
    check('password', 'the password is 3 characres long or more').isLength({ min: 3 }),
    check('password2').custom((pass, { req }) => {
        if (pass !== req.body.password) {
            throw 'passwords are not the same.'
        }
        return true;
    })
], async (req, res) => {

    const validationErrors = validationResult(req);


    try {
        if (!validationErrors.isEmpty()) {
            const err = validationErrors.errors.map(el => el.msg);
            throw err;
        }

        const { username, password, password2 } = req.body;

        // check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            throw 'username is already taken'
        }

        // encrypt the password
        const encryptedPass = await bcrypt.hash(password, config.SALT);
        if (!encryptedPass) {
            throw encryptedPass;
        }

        // register user in DB using User mongoose model
        user = new User({ username, password: encryptedPass });
        const dbUserCreateRes = await user.save();

        // json web token maintenent... si j'ai bien compris :)
        const token = jwt.sign(
            {
                user: {
                    id: dbUserCreateRes._id,
                    username: dbUserCreateRes.username
                }
            },
            config.SECRET,
            { expiresIn: 360000 }
        );

        if (!token) {
            throw token;
        }

        res.status(200).json(token);

    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err });
    }


});

// POST login user
router.post('/login', [
    check('username', 'username is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty()
], async (req, res) => {

    const { username, password } = req.body;

    try {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const err = validationErrors.errors.map(el => el.msg);
            throw err;
        }

        // check if user exists
        let user = await User.findOne({ username });
        if (!user) {
            throw 'username does not exists';
        }

        // compare password
        const encryptedPass = user.password;

        const isPassOk = await bcrypt.compare(password, encryptedPass);

        if (!isPassOk) {
            throw 'the password is incorrect';
        }

        // generate token
        const token = jwt.sign(
            {
                user: {
                    id: user._id,
                    username: user.username
                }
            },
            config.SECRET,
            { expiresIn: 360000 }
        )

        if (!token) {
            throw token;
        }

        res.status(200).json(token);
        
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err });
    }

});


module.exports = router;