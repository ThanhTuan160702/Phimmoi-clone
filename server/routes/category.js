const router = require("express").Router()
const ctrls = require('../controllers/category')


router.post('/createCategory',ctrls.createCategory)
router.get('/',ctrls.getAllCategory)
router.delete('/',ctrls.deleteCategory)

module.exports = router