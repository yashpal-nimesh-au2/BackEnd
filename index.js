var express = require('express');
var app = express();
var session=require('express-session');
var bodyParser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;
var hbs=require("express-handlebars");

app.use(session({
    secret:"Express"
}));
app.use(express.static('public'))
var main=hbs.create({
    extname:"hbs"
});
app.engine('hbs' , main.engine)
app.set('view engine','hbs');
app.set('views',__dirname+'/views');
var url;
if(process.env.MY_DB)
 url=process.env.MY_DB;
 else
 url='mongodb://127.0.0.1:27017';

mongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true  },function(err,client){
    if(err) throw err;
    app.locals.db=client.db('Attendance');
});
app.use(bodyParser.urlencoded({extended: true}));
var students=require("./students");
app.use('/students',students);

var instructors=require("./instructors");
app.use('/instructors',instructors);

app.get('/',function(req,res){

res.render("home",{
    title:"Home Page",
    style:"home",
    script:"home"
    });});

app.listen(process.env.PORT || 3000);