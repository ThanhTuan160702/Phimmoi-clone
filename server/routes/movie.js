const router = require("express").Router()
const ctrls = require('../controllers/movie')
const uploader = require('../config/cloudinary.config')

router.post('/createMovie',uploader.fields([{name: 'imageOther', maxCount: 1},{name: 'imageThumbnail', maxCount: 1},{name: 'video', maxCount: 1}]),ctrls.createMovie)
router.get('/allMovie',ctrls.getAllMovie)
router.post('/updateMovie/:mid', uploader.fields([{name: 'imageOther', maxCount: 1},{name: 'imageThumbnail', maxCount: 1},{name: 'video', maxCount: 1}]),ctrls.updateMovie)
router.get('/:movieSingleOrSeries/:name',ctrls.getMovie)
router.delete('/deleteMovie/:mid',ctrls.deleteMovie)

module.exports = router