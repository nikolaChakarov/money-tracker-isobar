const router = require('express').Router();

const User = require('../models/User');
const config = require('../config/config');

const { validationResult, check } = require('express-validator');
const jwt = require('json-web-token');
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

        res.status(200).json(req.body);
        
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err });
    }  

  
});

module.exports = router;