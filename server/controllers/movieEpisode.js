const MovieEpisode = require('../models/movieEpisode')
const Movie = require('../models/movie')
const asyncHandle = require('express-async-handler')
const slugify = require('slugify')

const createMovieEpisode = asyncHandle(async(req, res) => {
    const { name, episode, mid } = req.body
    if(!name || !episode || !mid){
        throw new Error('Missing input')
    }
    if(req.file){
        req.body.video = req.file.path
    }
    req.body.slug = slugify(req.body.name, {
        lower: true,
        replacement: '-',
        locale: 'vi',
    }) + '-tap-'+ `${episode}`;
    const response = await MovieEpisode.create(req.body)
    await Movie.findByIdAndUpdate(mid,{$inc: {numberOfEpisode: 1}}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Create movie episode sucessfully!' : 'Something went wrong'
    })
})

const getMovie = asyncHandle(async(req,res)=>{
    const { name } = req.params
    const response = await MovieEpisode.findOne({slug: name}).populate('mid', 'numberOfEpisode imageThumbnail')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

const updateEpisode = asyncHandle(async(req, res)=> {
    const { eid } = req.params
    const movie = await MovieEpisode.findById(eid);
    Object.entries(req.body).forEach(([key, value]) => {
        if(value === '' || value === 'null'){
            delete req.body[key]
        }
    });
    if(req.body.episode && Number(req.body.episode) !== Number(movie.episode)){
        req.body.slug = slugify(movie.name, {
            lower: true,
            replacement: '-',
            locale: 'vi',
        }) + '-tap-'+ `${req.body.episode}`;
        const response = await MovieEpisode.findOne({slug: req.body.slug})
        if(response && response._id.toString() !== eid){
            throw new Error(`Name is already !`);
        }
    }
    if(req.file){
        req.body.video = req.file.path
    }
    req.body.slug = slugify(movie.name, {
        lower: true,
        replacement: '-',
        locale: 'vi',
    }) + '-tap-'+ `${req.body.episode}`;
    const response = await MovieEpisode.findByIdAndUpdate(eid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Update is successfully" : "Something went wrong"
    })
})

const getAllEpisode = asyncHandle(async(req,res)=>{
    const queries = {...req.query}
    const excludeFields = ['limit', 'page']
    excludeFields.forEach(element => delete queries[element])

    if(queries.slug) queries.slug = { $regex: queries.slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"), $options: 'i' }
    
    const counts = await MovieEpisode.find(queries).countDocuments();
    
    let queryCommand = MovieEpisode.find(queries).populate('mid', 'numberOfEpisode imageThumbnail');

    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit

    queryCommand.skip(skip).limit(limit)

    const response = await queryCommand.exec()
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong",
        counts
    })
})

const deleteMovieEpisode = asyncHandle(async(req,res)=>{
    const { eid } = req.params
    const { _id } = req.body
    await Movie.findByIdAndUpdate(_id,{$inc: {numberOfEpisode: -1}}, {new: true})
    const response = await MovieEpisode.findByIdAndDelete(eid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Deleted successfully !" : "Something went wrong"
    })
})

module.exports = {
    createMovieEpisode,
    getMovie,
    getAllEpisode,
    deleteMovieEpisode,
    updateEpisode
}