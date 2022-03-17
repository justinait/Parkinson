module.exports = (req, res, next) => {
    
    if (req.session.logged) {
        res.locals.logged = req.session.logged
    }

    next()
}