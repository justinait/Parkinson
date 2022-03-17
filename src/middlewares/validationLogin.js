const usersModel = require('../model/usersModel');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

const validationLogin = [
    body('email').isEmail().withMessage('EMAIL'),
    body('password').notEmpty().withMessage('pone algo').bail()
    .custom((value, {req}) => {
        const {email, password} = req.body
        const userFound = usersModel.findByField('email', email)
        if(userFound){
            const passwordMatch = bcrypt.compareSync(password, userFound.password)

            if(passwordMatch){
                return true
            }                
        }
        return false
    }).withMessage('credenciales invalidas'),

]

module.exports = validationLogin