module.exports = (req, res, next) => {
    if(!req.user)
    {
        // if user not logged in
        res.redirect('/auth/login');
    }
    else
    {
        // if logged in
        next()
    }
};