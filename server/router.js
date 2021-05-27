const router = require('express').Router();
const users = require('./services/users');

router.use('/api/users/', users);
//router.use('/api/data/', require('./services/data.js'))

module.exports = router;