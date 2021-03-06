const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    postedBy : {
        type : ObjectId, 
        ref : "User"
    }
}, {timestamps : true});
mongoose.model('Note', noteSchema)