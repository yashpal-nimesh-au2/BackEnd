$(document).ready(function(){
    $(".student").click(function(){
      $('form').attr('action', '/students/');
      $("form").attr("method", "get");
   });
   $(".instructor").click(function(){
    $('form').attr('action', '/instructors/');
    $("form").attr("method", "get");
 });
 })

