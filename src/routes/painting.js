const express = require('express');
const multer = require('multer');
const router = express.Router();
const paintingController = require('../controllers/paintingController');
const { body } = require('express-validator');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
 
const storage = multer.diskStorage({
    destination(req, file, cb){
        const {category} = req.body;
        const destinationPath = path.resolve(__dirname, '../../public/images/paintings/', category)
        cb(null, destinationPath);
    },
    filename(req, file, cb ){
        let fileName =  Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})
const upload = multer({storage});
const validateCreateForm = [
    body('title').notEmpty().withMessage('Debes completar el campo de titulo'),
    body('width').isInt().withMessage('Debes completar el campo de ancho'),
    body('high').isInt().withMessage('Debes completar el campo de altura'),
    body('category').notEmpty().withMessage('Debes completar el campo de categoria'),
    body('mainImage').custom((value, {req}) => {
        let file = req.file;
        if(!file){
            throw new Error('No pusiste img');
        }
        const AVAILABLEEXTENSIONS = ['.jpg', '.jpeg', '.png']
        const extension = path.extname(file.originalname);
        if(!AVAILABLEEXTENSIONS.includes(extension)){
            throw new Error ('Archivo imagen!');            }
        return true;
    })
]

router.get('/create', authMiddleware, paintingController.create);
router.post('/create', upload.single('mainImage'), authMiddleware, validateCreateForm, paintingController.processCreate);

router.get('/series', paintingController.listSeries);
router.get('/paintings', paintingController.list);
router.get('/:id', paintingController.detail);
router.get('/paintings/:category', paintingController.listByCategory);


router.delete("/:id", authMiddleware, paintingController.destroy);

router.get('/:id/edit', authMiddleware, paintingController.edit);
router.put('/:id', upload.single("mainImage"), authMiddleware, paintingController.editProcess);

module.exports = router;