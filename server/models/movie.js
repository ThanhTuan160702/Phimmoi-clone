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
    date:{
        type: Date,
        required:true
    },
    time:{
        type:String,
        required:true,
    },
    nation:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    star:{
        type:Number,
        required:true,
    },
    actor:[
        {
            actor: {type: mongoose.Types.ObjectId, ref: 'Actor'}
        }
    ],
    category:[
        {
            category: {type: mongoose.Types.ObjectId, ref: 'Category'}
        }
    ],
    image:{
        type:String,
        required:true,
    },
    format:{
        type:Boolean
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Movie', movieSchema);