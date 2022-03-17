const usersModel = require('../model/usersModel');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

const validationRegister = [
    body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('email').isEmail().withMessage('pone un email valido').bail()
    .custom((value)=>{
        const userFound = usersModel.findByField('email', value)
        if(userFound){
            return false;
        }
        return true;
    }).withMessage('Ya existe el usuario'),
    body('password').notEmpty().withMessage('Elige tu contrasena')
]

module.exports = validationRegister