const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var movieEpisodeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    slug:{
        type:String
    },
    episode:{
        type: Number
    },
    video:{
        type:String
    },
    mid:{
        type: mongoose.Types.ObjectId, ref: 'Movie'
    },
});

//Export the model
module.exports = mongoose.model('MovieEpisode', movieEpisodeSchema);