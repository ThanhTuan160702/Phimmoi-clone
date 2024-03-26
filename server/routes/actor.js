const router = require("express").Router()
const ctrls = require('../controllers/actor')

router.post('/createActor',ctrls.createActor)
router.get('/',ctrls.getAllActor)
router.get('/getActor',ctrls.getActor)
router.delete('/',ctrls.deleteActor)

module.exports = router

