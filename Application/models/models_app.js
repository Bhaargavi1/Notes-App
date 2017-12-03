// Making a schema
var mongoose = require('mongoose');
var person_Schema = mongoose.Schema({
         name: String,
         email: {
             type : String,
             unique: true
         },
         pswd: String
       });
person_Schema.path('email').index({ unique: true });
module.exports =  mongoose.model("Person", person_Schema);