const router = require("express").Router()
const ctrls = require('../controllers/category')
const uploader = require('../config/cloudinary.config')

router.post('/createCategory',ctrls.createCategory)
router.get('/',ctrls.getAllCategory)
router.delete('/',ctrls.deleteCategory)

module.exports = router