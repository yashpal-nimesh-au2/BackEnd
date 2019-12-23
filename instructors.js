var express=require("express");
var router=express.Router();
const alert =require('alert-node');

router.get('/',function(req,res){

        res.render("instructors",{
            title:"instructors Page",
            style: "instructor",
            script: "instructor"
            });
            req.session.destroy();

 });

 router.post('/signup',function(req,res){
    // console.log(req.body.Name,req.body.Email,req.body.Password);
    var db =req.app.locals.db;
    db.collection('instructors').find({Email : req.body.Email}).toArray(function(err,result){
        if(err) throw err;
        // console.log(result.length);
        if(result.length===0){
            let data={Name:req.body.Name,Email:req.body.Email,Password:req.body.Password}
    db.collection('instructors').insertOne(data,function(err,result){
    if(err) throw err;
    res.redirect('/instructors/');
    // console.log("Document Inserted");
    alert("Account Created");
    });
        }
        else{
            res.redirect('/instructors/');
            alert("User Already Exist");
        }
    })
    // console.log("signup");
    req.session.destroy();
 });

 router.post('/signin',function(req,res){
    // console.log(req.body.Email,req.body.Password);
    var db =req.app.locals.db;
    db.collection('instructors').find({Email:req.body.Email}).toArray(function(err,result){
        if(err) throw err;
        // console.log(result);
        if(result.length===0){
            res.redirect('/instructors/');
            alert("User not Exist");   
        }
        else{
            // console.log(result[0].Password);
            if(req.body.Password===result[0].Password){
                req.session.Email=req.body.Email;
                res.redirect('/instructors/main');

            }
            else{
                alert("Wrong Password");  
                res.redirect('/instructors/');


            }

        }
    })
    // console.log("signin");
 });


router.get('/main', function (req, res) {
// console.log(req.session.Email);

if(req.session.Email){
    var db =req.app.locals.db;;
    db.collection('students').find().toArray(function(err,result){
        if(err) throw err;
        res.render("InstructorMainPage",{
            title:"instructor MainPage",
            style: "instructor",
            script: "instructor",
            StudentData : result
            });})
}
else{
    res.redirect('/instructors/');

}
})



router.post('/add', function (req, res) {
    console.log(req.body.Email,req.body.quantity);
    var db =req.app.locals.db;
    db.collection('students').find({Email:req.body.Email}).toArray(function(err,result){
        if(err) throw err;
        // console.log("main")
        console.log(result[0].Attendance);
        let y=result[0].Attendance+1;
        db.collection("students").updateOne({Email:req.body.Email}, { $set: {Attendance : y } },function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          })
          res.redirect('/instructors/main');
        }) })

router.post('/minus', function (req, res) {
    console.log(req.body.Email,req.body.quantity);
    if(req.body.quantity==0){
        res.redirect('/instructors/main');

    }
    else{
    var db =req.app.locals.db;
    db.collection('students').find({Email:req.body.Email}).toArray(function(err,result){
        if(err) throw err;

    let y=result[0].Attendance-1;
    db.collection("students").updateOne({Email:req.body.Email}, { $set: {Attendance : y } },function(err, res) {
        if (err) throw err;
        console.log("1 document Deleted");
        })
        res.redirect('/instructors/main');
    })

    }
     })

     router.post('/logout', function (req, res) {
req.session.destroy();
res.redirect('/instructors/');

         })
            

    


module.exports=router;