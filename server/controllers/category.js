const Category = require("../models/category")
const asyncHandle = require('express-async-handler')

const createCategory = asyncHandle(async(req,res)=>{
    const { name } = req.body
    if(!name){
        throw new Error('Missing input')
    }
    const response = await Category.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Add category is successfully" : "Something went wrong"
    })
})

const getAllCategory = asyncHandle(async(req,res)=>{
    const response = await Category.find()
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

const deleteCategory = asyncHandle(async(req,res)=>{
    const { cid } = req.body
    const response = await Category.findByIdAndDelete(cid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Deleted successfully !" : "Something went wrong"
    })
})

module.exports = {
    createCategory,
    getAllCategory,
    deleteCategory
}