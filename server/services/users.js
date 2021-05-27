const router = require('express').Router();

// POST login user
router.post('/login', (req, res) => {

    console.log(req.body);

    res.status(200).json(req.body);

});

module.exports = router;