const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    nameEng:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique: true
    },
    date:{
        type: Date
    },
    time:{
        type:String
    },
    nation:{
        type:String
    },
    description:{
        type:String,
        required:true,
    },
    star:{
        type:Number,
        required:true,
    },
    numberOfEpisode:{
        type:Number,
        default: 0
    },
    category:{
        type: String
    },
    imageThumbnail:{
        type:String
    },
    imageOther:{
        type:String
    },
    video:{
        type:String
    },
    movieSingleOrSeries:{
        type:String
    },
    quality:{
        type:String
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Movie', movieSchema);