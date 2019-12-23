var express=require("express");
var router=express.Router();
const alert =require('alert-node');


router.get('/',function(req,res){

        res.render("students",{
            title:"students Page",
            style: "student",
            script: "student"
            });
            req.session.destroy();

 });

 router.post('/signup',function(req,res){
    // console.log(req.body.Name,req.body.Email,req.body.Password);
    var db =req.app.locals.db;
    db.collection('students').find({Email : req.body.Email}).toArray(function(err,result){
        if(err) throw err;
        // console.log(result.length);
        if(result.length===0){
            let data={Name:req.body.Name,Email:req.body.Email,Password:req.body.Password,
            Attendance:0}
    db.collection('students').insertOne(data,function(err,result){
    if(err) throw err;
    res.redirect('/students/');
    // console.log("Document Inserted");
    alert("Account Created");
    });
        }
        else{
            res.redirect('/students/');
            alert("User Already Exist");
        }
    })
    // console.log("signup");
    req.session.destroy();

 });

 router.post('/signin',function(req,res){
    // console.log(req.body.Email,req.body.Password);
    var db =req.app.locals.db;
    db.collection('students').find({Email:req.body.Email}).toArray(function(err,result){
        if(err) throw err;
        // console.log(result);
        if(result.length===0){
            res.redirect('/students/');
            alert("User not Exist");   
        }
        else{
            // console.log(result[0].Password);
            if(req.body.Password===result[0].Password){
                req.session.Email=req.body.Email;
                res.redirect('/students/main');

            }
            else{
                alert("Wrong Password");  
                res.redirect('/students/');


            }

        }
    })
    // console.log("signin");
 });


router.get('/main', function (req, res) {

if(req.session.Email){
    
    var db =req.app.locals.db;
    db.collection('students').find({Email:req.session.Email}).toArray(function(err,result){
        if(err) throw err;

        res.render("StudentMainPage",{
            title:"Student MainPage",
            style: "student",
            script: "student",
            Attendance : result[0].Attendance
    
            });

    })
}
else{
    res.redirect('/students/');

}
    })

    router.post('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/students/');

        })


module.exports=router;