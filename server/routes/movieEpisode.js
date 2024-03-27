const router = require("express").Router()
const ctrls = require('../controllers/movieEpisode')
const uploader = require('../config/cloudinary.config')

router.post('/createMovieEpisode',uploader.single('video'),ctrls.createMovieEpisode)
router.post('/updateEpisode/:eid', uploader.single('video'),ctrls.updateEpisode)
router.get('/getAllEpisode',ctrls.getAllEpisode)
router.get('/:name',ctrls.getMovie)
router.delete('/deleteEpisode/:eid',ctrls.deleteMovieEpisode)


module.exports = router