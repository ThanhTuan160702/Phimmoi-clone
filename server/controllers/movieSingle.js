const MovieSingle = require("../models/movieSingle")
const asyncHandle = require('express-async-handler')

const createMovieSingle = asyncHandle(async(req,res)=>{
    const { name, nameEng, date, time, nation, description, star} = req.body
    if(req.body.length < 7){
        throw new Error('Missing input')
    }
    console.log(req.file)
    if(req.file){
        req.body.image = req.file.path
    }
    const response = await MovieSingle.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Add movie single is successfully" : "Something went wrong"
    })
})

const getAllMovieSingle = asyncHandle(async(req,res)=>{
    const response = await MovieSingle.find()
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

const deleteMovieSingle = asyncHandle(async(req,res)=>{
    const { msid } = req.body
    const response = await MovieSingle.findByIdAndDelete(msid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Deleted successfully !" : "Something went wrong"
    })
})

module.exports = {
    createMovieSingle,
    getAllMovieSingle,
    deleteMovieSingle
}