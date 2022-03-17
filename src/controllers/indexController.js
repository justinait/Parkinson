const path = require('path');
const paintingsModel = require('../model/paintingsModel')

let indexController={
    
    home(req, res){
        const prizes = paintingsModel.findAll()
        res.render("index", {prizes});
    }
}

module.exports = indexController;