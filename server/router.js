const router = require('express').Router();
const users = require('./services/users');

router.use('/api/users/', users);
router.use('/api/payments/', require('./services/payments.js'))

module.exports = router;