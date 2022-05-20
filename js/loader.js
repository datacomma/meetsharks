// document.onreadystatechange = function() {
//     if (document.readyState !== "complete") {
//         document.querySelector(
//           "body").style.visibility = "hidden";
//         document.querySelector(
//           "#loader").style.visibility = "visible";
//     } else {
//         document.querySelector(
//           "#loader").style.display = "none";
//         document.querySelector(
//           "body").style.visibility = "visible";
//     }
// };

// $('#loaderv').show().delay(2000).hide();

// const timeout = document.getElementsByClassName('center')
// setTimeout(hideElement, 1000) //milliseconds until timeout//
// function hideElement() {
//   timeout.style.display = 'none';
// };

$(document).ready(function() { 
  var id ='#dialog';
  //Get the screen height and width
  var maskHeight = $(document).height();
  var maskWidth = $(window).width();
  //Set heigth and width to mask to fill up the whole screen
  $('#mask').css({'width':maskWidth,'height':maskHeight});
   
  //transition effect
  $('#mask').fadeIn(500);
  $('#mask').fadeTo("slow",0.9); 
  //Get the window height and width
  var winH = $(window).height();
  var winW = $(window).width();
                 
  //Set the popup window to center
  
  $(id).css('top',  winH/2-$(id).height()/2);
  $(id).css('left', winW/2-$(id).width()/2);
  
  //transition effect
  $(id).fadeIn(2000);  
     
  //if close button is clicked
  $('.window .close').click(function (e) {
    //Cancel the link behavior
    e.preventDefault();
    $('#mask').hide();
    $('.window').hide();
  });
   
  //if mask is clicked
  $('#mask').click(function () {
    $(this).hide();
    $('.window').hide();
  });
});
  