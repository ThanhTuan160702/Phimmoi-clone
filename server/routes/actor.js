const router = require("express").Router()
const ctrls = require('../controllers/actor')
const uploader = require('../config/cloudinary.config')

router.post('/createActor',ctrls.createActor)
router.get('/',ctrls.getAllActor)

module.exports = router

