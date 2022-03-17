const paintingsModel = require('../model/paintingsModel')
const multer = require('multer');
const {validationResult} = require('express-validator')

const paintingController={
    list: (req, res)=>{
        const paintings = paintingsModel.findAll();
        res.render("painting/gallery", {paintings});
    },
    listByCategory(req, res){
        const { category } = req.params;
        const paintings = paintingsModel.listByCategory(category);
        res.render("painting/gallery", {paintings});
    },
    listSeries: (req, res)=>{
        const paintings = paintingsModel.findAll();
        res.render("painting/series", {paintings});
    },
    detail: (req, res)=>{ 
        const id = req.params.id;
        const paintingDetail = paintingsModel.findByPk(id);
        res.render("painting/detail", {paintingDetail});
    },
    create(req, res){
        res.render("painting/create");
    },
    processCreate(req, res){
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
            res.render("painting/create", {
                errors: resultValidation.mapped(),
                oldValues: req.body
            });
        }else{
        const {title, high, width, category, serie, serieName } = req.body;
        const {file} = req;
        const mainImage = '/images/paintings/' + category + '/' + file.filename;
        const newPainting = {
            title, 
            high, 
            width,
            category,
            serie,
            serieName,
            mainImage
        }
        paintingsModel.store(newPainting);
        res.redirect("/");
        }
    },
    editProcess(req, res){
        const data = req.body;
        const {id} = req.params;
        const {file} = req;
        const paintingOriginal = paintingsModel.findByPk(id);

        let mainImage = paintingOriginal.mainImage;

        if(file){
            mainImage = '/images/paintings/' + data.category + '/' + file.filename;
        }
        
        data.mainImage = mainImage;

        paintingsModel.editProcess(data, id);
        res.redirect('/gallery/'+ id)
    },
    destroy(req, res){
        const id = req.params.id;
        paintingsModel.destroy(id)
        res.redirect('/')
    },
    edit(req, res){
        const painting = paintingsModel.findByPk(req.params.id);
        res.render('painting/edit', {painting})
    }
}

module.exports = paintingController;