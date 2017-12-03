var Person = require('../models/models_app.js');
var Notes_Get = require("../models/models_notes.js");
// Function signup called for signup
var a, update, note_data; // Declaring the global variable to get login/register data
module.exports.signup= function(req,res){
     var personInfo = req.body;
     var newPerson = new Person({
         name: personInfo.fname,
         email: personInfo.email,
         pswd: personInfo.pswd
        });
    a = ""; 
    /* making the value of a to "" so that in getdata last registered name is retrieved */ 
    newPerson.save(function(err){
            if(err){
              console.log('show_message', {message: "Database error", type: "error"});
             res.render('forms.html');
            }
            else  {
              console.log('show_message', {message: "New person added"});
              res.render('main.html'); 
            }
         });
 };
// Function for login
module.exports.login = function(req,res){
     var userInfo = req.body; 
     var mail = userInfo.email_login;
     var pass = userInfo.paswd;
     Person.find({'email':mail, 'pswd' : pass}, function(err, mailing){
         var len = mailing.length;
         if(len == 1){
             console.log("Success");
             res.render('main.html');
             a = mailing;
             // Getting the last logged in user
         }
         else{
             console.log("error");
             res.render('forms.html');
         }
   });    
};
// Function for getting data to front end
module.exports.getdata = function(req,res){
    if(a == ""){
        var q = Person.find({});
        q.exec(function(req,result){
           var obj = result;
           var length = obj.length;
            note_data = obj[length -1];
           res.send(obj[length -1]); // Sending the data to front end
        });
    }
    else{
        note_data = a[0];
        console.log(a[0]);
        res.send(a[0]);// Sending the data to front end
    }
};
// Function for adding a note
module.exports.add= function(req,res){
    var allNotes = req.body;
    var newNote = new Notes_Get({
       title: allNotes.notes_title,
       notes: allNotes.my_notes,
        name: allNotes.name,
       email: allNotes.email
    });
    newNote.save(function(error){
        if(error){
           console.log(error); 
        }
        else{
            console.log("New Note Saved");
            res.render('views.html');
        }
    });
};
// Viewing tbe note
module.exports.view = function(req,res){
    console.log(note_data.email);
    var mailid = note_data.email;
    Notes_Get.find({'email':mailid}, function(err, notes_all){
         console.log(notes_all);
        res.send(notes_all);
});
};
// Deleting the note
module.exports.delete = function(req,res){
    var arr = req.params.id;
    var newid = arr.split(":");
  Notes_Get.remove({_id: newid[1]}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete note with id " + req.params.id});
        } else {
            res.render('delete.html');
        }
    });
};
// Updaing the note
module.exports.update = function(req,res){
    var arr = req.params.id;
    var newid = arr.split(":");
  Notes_Get.findById({_id: newid[1]}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not find note with id " + req.params.id
         });
        } else{
            console.log(data);   
            data.title = req.body.notes_title;
            data.notes = req.body.my_notes;
             data.save(function(error){
                 if(error){
                     console.log("error"); 
                 }
                 else{
                     console.log("Old Note Updated");
                     res.render("update_notes.html");
                 }
               });
            }  
       });
};