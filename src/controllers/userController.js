const paintingsModel = require('../model/paintingsModel')
const usersModel =  require('../model/usersModel.js')
const { validationResult } = require('express-validator');
const { readFile } = require('../model/usersModel.js');
const bcrypt = require('bcryptjs');
const { maxAgeUserCookie } = require('../config/config');

let userController={
    login(req, res){
        res.render('./user/login')
    },
    register(req, res){
        res.render('./user/register')
    },
    processRegister(req, res){
        let resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            res.render('./user/register', {
                errors: resultValidation.mapped(),
                oldValues: req.body
            });
        } else{

            //chequear q no exista el usuario
            const users = usersModel.findAll();
            const {name, email, password} = req.body;
            const hashPassword = bcrypt.hashSync(password, 12)
            
            const newUser = {
                name,
                email,
                password: hashPassword
            }
            usersModel.store(newUser);
            res.redirect('/');
            }
            
    },
    processLogin(req, res){
        let resultValidation = validationResult(req);
        const oldValues = req.body;
        
        if(resultValidation.errors.length > 0){
            res.render('./user/login', {
                oldValues, errors: resultValidation.mapped(),
            });
        }
        const {email, remember} = req.body;

        const user = usersModel.findByField('email', email);
        
        delete user['password'];
        req.session.logged = user;

        if(remember){
            res.cookie('user', user.id, {
                maxAge: maxAgeUserCookie
            })
        }

        res.redirect('/');
    },
    curriculum(req, res){
        res.render("./user/about");
    },
    adminList(req, res){
        const paintings = paintingsModel.findAll();
        res.render("./user/adminList", {paintings});
    },
    logout(req, res){
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/');
    }
}

module.exports = userController;