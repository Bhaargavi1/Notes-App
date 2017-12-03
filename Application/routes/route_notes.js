module.exports = function(app){
    var notes_add = require("../controller/controller_notes.js");
    app.post("/addnotes" , function(res,req){
       notes_add.add;
    });    
}
