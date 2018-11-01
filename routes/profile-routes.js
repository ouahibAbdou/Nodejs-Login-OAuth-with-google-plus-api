const router = require('express').Router();
const authCheck = require('../config/auth-check')

router.get('/', authCheck, (req, res) => {
    // res.send(`Welcome Mister ${JSON.stringify(req.user)}`);
    res.render('profile', {user: req.user});
});

module.exports = router;