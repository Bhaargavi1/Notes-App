var mongoose = require("mongoose");
var noteSchema = mongoose.Schema({
    title : {
         type : String,
        unique: true,
        required: true
    },
    notes : {
        type: String,
        required: true
    },
    email : {
         type : String,
        required: true
    },
    name : String
});
noteSchema.path("title").index({unique : true});
module.exports = mongoose.model("Notes_Get" , noteSchema);