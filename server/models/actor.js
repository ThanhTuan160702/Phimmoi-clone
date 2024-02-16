const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var actorSchema = new mongoose.Schema({
    nameReal:{
        type:String,
        required:true
    },
    nameFake:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    position:{
        type:String,
        required:true
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Actor', actorSchema);