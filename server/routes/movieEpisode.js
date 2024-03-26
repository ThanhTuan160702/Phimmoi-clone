const router = require("express").Router()
const ctrls = require('../controllers/movieEpisode')
const uploader = require('../config/cloudinary.config')

router.post('/createMovieEpisode',uploader.single('video'),ctrls.createMovieEpisode)
router.get('/getAllEpisode',ctrls.getAllEpisode)
router.get('/:name',ctrls.getMovie)
router.post('/',ctrls.deleteMovieEpisode)


module.exports = router