const router = require("express").Router()
const ctrls = require('../controllers/movie')
const uploader = require('../config/cloudinary.config')

router.post('/createMovie',uploader.fields([{name: 'imageOther', maxCount: 1},{name: 'imageThumbnail', maxCount: 1},{name: 'video', maxCount: 1}]),ctrls.createMovie)
router.get('/allMovie',ctrls.getAllMovie)
router.get('/:movieSingleOrSeries/:name',ctrls.getMovie)
router.delete('/',ctrls.deleteMovie)

module.exports = router