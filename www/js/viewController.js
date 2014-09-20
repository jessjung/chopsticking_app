var playInterval;
// var that;
var sec;

function ViewController(app) {
  this.app = app;
  this.status = '';

  this.debug = false;
}

ViewController.prototype.scan = function() {

  console.log("\n\nViewController::scan\n\n");
  this.clear();

  $('#scan-page').css('display','block');
  $('#scan-head').html("Finding a chopsticking board...");

}

ViewController.prototype.scanFailed = function() {

  console.log("\n\nViewController::scanfailed\n\n");
  this.clear();

  $('#scan-page').css('display','block');
  $('#scan-head').html("Can't find a chopsticking board!");

}

ViewController.prototype.init = function() {

  console.log("\n\nViewController::init\n\n");
  this.clear();

  $('body').removeClass('scorebg');
  $('#init-page').css('display','block');

  playInterval = 300;
  sec = 3;

  that = this;

  console.log($('body').html());

  $('#game-start').click(function(){
    that.app.onwrite('s');
    that.ready();
    console.log("Game Started!");
  });

}

ViewController.prototype.ready = function() {

  console.log("\n\nViewController::ready\n\n");
  this.clear();

  $('#ready-page').css('display','block');

  sec = 3;
   var intervalId = setInterval(function () {
       if(sec == 0) {
          $('#ready-body').html("GO");
          $('#ready-head').html("Pick all up!");
       } else if(sec < 0) {
          $('#ready-page').css('display','none');
          clearInterval(intervalId);
          that = this;
          that.app.onplay();

       } else
           $('#ready-body').html(sec);
       sec--;
   }, 1000);
}

ViewController.prototype.countdown = function() {

  console.log("\n\nViewController::countdown\n\n");
  this.clear();

  $('#countdown-page').css('display','block');

  var imgArray = [
    './img/icon-sushi.png','./img/icon-roll.png','./img/icon-dimsum.png'
  ];



  var currenthtml;
  playInterval = 300; //playInterval*10;

  that = this;

  var intervalId = setInterval(function () {
      if(playInterval == 0) {
          //  $('#ready-page').css('display','none');
          console.log("Game finished!");
          $('#countdown-head').html("DONE!");
          $('#countdown-body').addClass("blink");
          that.app.onwrite('x');
       }else if(playInterval < -300) {
          playInterval = 30;
          clearInterval(intervalId);
          // var that = this;
          that.app.resetGame();
       } else if(playInterval > 0){
          var sec = playInterval/10;
          sec = Math.floor(sec);

          if(sec < 10){
            currenthtml = "00:0"+sec;
          }else{
            currenthtml = "00:"+sec;
          }
          $('#countdown-body').html(currenthtml);
          // that.app.onwrite('u');

          if(playInterval%7 == 0){
            var nextIcon = "url(" + imgArray[Math.floor(Math.random() * imgArray.length)] + ") no-repeat center top";
            $('.col-1').css("background", nextIcon);
            $('.col-1').css("background-size", "60%, 60%");
            nextIcon = "url(" + imgArray[Math.floor(Math.random() * imgArray.length)] + ") no-repeat center top";
            $('.col-3').css("background", nextIcon);
            $('.col-3').css("background-size", "60%, 60%");

          }
        }
      playInterval--;

  }, 100);
}

ViewController.prototype.displayScore = function(p1p,p2p,p1s,p2s) {
  console.log("\n\nViewController::displayScore\n\n");
  this.clear();

  // var currenthtml = p1p+"/"+p2p+"/"+p1s+"/"+p2s;
  // var scorebg = "url('./img/bg-score.jpg') no-repeat center top";

  $('body').addClass('scorebg');
  $('#score-page').css('display','block');
  $('#p1p').html(p1p);
  $('#p1s').html(p1s);
  $('#p2p').html(p2p);
  $('#p2s').html(p2s);

}

ViewController.prototype.clear = function() {

  console.log("\n\nViewController::clear\n\n");
  $('#scan-page').css('display','none');
  $('#init-page').css('display','none');
  $('#ready-page').css('display','none');
  $('#countdown-page').css('display','none');
  $('#score-page').css('display','none');

}
