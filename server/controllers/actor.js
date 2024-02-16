const Actor = require("../models/actor")
const asyncHandle = require('express-async-handler')

const createActor = asyncHandle(async(req,res)=>{
    const { nameReal,nameFake ,image, position } = req.body
    console.log(req.body)
    if(!nameReal || !nameFake || !position){
        throw new Error('Missing input')
    }
    const response = await Actor.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Add actor is successfully" : "Something went wrong"
    })
})

const getAllActor = asyncHandle(async(req,res)=>{
    const response = await Actor.find()
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

module.exports = {
    createActor,
    getAllActor
}