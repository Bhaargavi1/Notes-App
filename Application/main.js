// Requiring all Important things
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended : true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notesapp', { 
    useMongoClient: true});
mongoose.Promise = require('bluebird');

// Using express.static to get the filename of css,images, jss
app.use(express.static("assets"));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/',function(req,res){
  res.render('forms.html'); 
});
app.get('/main',function(req,res){
  res.render('main.html'); 
});
app.get('/add',function(req,res){
  res.render('add.html'); 
});
app.get('/view',function(req,res){
  res.render('views.html'); 
});
app.get('/update/:id',function(req,res){
  res.render('update.html'); 
});
// Routing
var form = require(path.join(__dirname+'/controller/controller_app.js'));
app.post('/register', form.signup);
app.post('/login',form.login);
app.get('/view_data', form.getdata);
app.post('/addnotes', form.add);
app.get("/view_notes", form.view);
app.get('/delete/:id', form.delete);
app.post('/update/:id', form.update);

app.listen(8080);
//Listening to the port