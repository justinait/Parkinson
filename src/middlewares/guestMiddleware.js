module.exports = (req, res, next) => {
    const usersSession = req.session.logged;

    if(usersSession){
        res.render('/user/login')
    }
    next();
}
