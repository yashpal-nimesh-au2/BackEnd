$(document).ready(function(){
   $(".SignUp").click(function(){
 $(".SignUp").addClass("d-none");
 $(".SignIn").removeClass("d-none");
 $("#signinForm").addClass("d-none");
 $("#signupForm").removeClass("d-none");
 
  });
 
  $(".SignIn").click(function(){
    $(".SignIn").addClass("d-none");
    $(".SignUp").removeClass("d-none");
    $("#signinForm").removeClass("d-none");
    $("#signupForm").addClass("d-none");
  });



  $(".Add").click(function(){
    $('form').attr('action', '/instructors/add');
    $("form").attr("method", "post");
 });

 $(".Minus").click(function(){
  $('form').attr('action', '/instructors/minus');
  $("form").attr("method", "post");
});

  
 })
 
 
 