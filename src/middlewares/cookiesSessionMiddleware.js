const usersModel = require('../model/usersModel')

module.exports = (req, res, next) => {
    //existe cooki? buscamos en el modelo el usuario y lo guardamos en la session
    const userCookie = req.cookies.user;

    if(userCookie){
        const user = usersModel.findByPk(userCookie)
        delete user.password;
        req.session.logged = user;
    }
    next();
}