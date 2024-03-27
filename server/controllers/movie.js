const Movie = require('../models/movie')
const asyncHandle = require('express-async-handler')
const slugify = require('slugify')

const createMovie = asyncHandle(async(req,res)=>{
    const fields = ['name', 'nameEng', 'date','nation', 'description', 'star'];
    const missingFields = fields.filter(field => !(field in req.body));
    if (missingFields.length > 0) {
        throw new Error(`Missing input: ${missingFields.join(', ')}`);
    }
    if (req.files) {
        const fieldNames = Object.keys(req.files);
        fieldNames.forEach(fieldName => {
            const file = req.files[fieldName];
            if (fieldName === 'video') {
                req.body.video = file[0].path;
            } else if (fieldName === 'imageOther') {
                req.body.imageOther = file[0].path;
            } else {
                req.body.imageThumbnail = file[0].path;
            }
        });
    }
    req.body.slug = slugify(req.body.name, {
        lower: true,
        replacement: '-',
        locale: 'vi',
    });
    const response = await Movie.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Add movie single is successfully" : "Something went wrong"
    })
})

const getAllMovie = asyncHandle(async(req,res)=>{
    const queries = { ...req.query }
    const excludeFields = ['limit', 'sort', 'page']
    excludeFields.forEach(element => delete queries[element])
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    let formatedQueries = JSON.parse(queryString)
    if(queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
    if(queries?.nation) formatedQueries.nation = { $regex: queries.nation, $options: 'i' }
    if(queries.slug) formatedQueries.slug = { $regex: queries.slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"), $options: 'i' }
    if(queries?.date){
        const startOfYear = new Date(`${queries?.date}-01-01T00:00:00.000Z`);
        const endOfYear = new Date(`${queries?.date}-12-31T23:59:59.999Z`);
        formatedQueries.date = { $gte: startOfYear, $lte: endOfYear };
    }

    const counts = await Movie.find(formatedQueries).countDocuments();

    let queryCommand = Movie.find(formatedQueries);

    if(req.query.sort) {
        queryCommand = queryCommand.sort(req.query.sort)
    }

    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    const response = await queryCommand.exec();
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong",
        counts
    })
})

const getMovie = asyncHandle(async(req,res)=>{
    const { movieSingleOrSeries, name } = req.params
    const response = await Movie.findOne({slug: name, movieSingleOrSeries: movieSingleOrSeries})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

const updateMovie = asyncHandle(async(req, res)=> {
    const { mid } = req.params
    const movie = await Movie.findById(mid);
    Object.entries(req.body).forEach(([key, value]) => {
        if(value === '' || value === 'null'){
            delete req.body[key]
        }
    });
    if(req.body.name && req.body.name !== movie.name){
        req.body.slug = slugify(req.body.name, {
            lower: true,
            replacement: '-',
            locale: 'vi',
        });
        const response = await Movie.findOne({slug: req.body.slug})
        if(response && response._id.toString() !== mid){
            throw new Error(`Name is already !`);
        }
    }
    if(req.files){
        const fieldNames = Object.keys(req.files);
        fieldNames.forEach(fieldName => {
            const file = req.files[fieldName];
            if (fieldName === 'video') {
                req.body.video = file[0].path;
            } else if (fieldName === 'imageOther') {
                req.body.imageOther = file[0].path;
            } else {
                req.body.imageThumbnail = file[0].path;
            }
        });
    }
    if(req.body.name){
        req.body.slug = slugify(req.body.name, {
            lower: true,
            replacement: '-',
            locale: 'vi',
        });
    }
    const response = await Movie.findByIdAndUpdate(mid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Update is successfully" : "Something went wrong"
    })
})

const deleteMovie = asyncHandle(async(req,res)=>{
    const { mid } = req.params
    const response = await Movie.findByIdAndDelete(mid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Deleted successfully !" : "Something went wrong"
    })
})

module.exports = {
    createMovie,
    getAllMovie,
    deleteMovie,
    getMovie,
    updateMovie
}