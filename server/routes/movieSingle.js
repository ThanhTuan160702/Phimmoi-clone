const router = require("express").Router()
const ctrls = require('../controllers/movieSingle')
const uploader = require('../config/cloudinary.config')

router.post('/createMovieSingle',uploader.single('image'),ctrls.createMovieSingle)
router.get('/',ctrls.getAllMovieSingle)
router.delete('/',ctrls.deleteMovieSingle)

module.exports = router