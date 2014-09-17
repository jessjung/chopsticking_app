var playInterval = 20;

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
  $('#init-page').css('display','block');

  var that = this;
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

  var sec = 3;
   var intervalId = setInterval(function () {
       if(sec == 0) {
          $('#ready-head').html("Play!");
       } else if(sec < 0) {
         console.log('can you see this?')
          $('#ready-page').css('display','none');
          clearInterval(intervalId);
          var that = this;
          that.app.onplay();

       } else
           $('#ready-head').html(sec);
       sec--;
   }, 1000);
}

ViewController.prototype.countdown = function() {

  console.log("\n\nViewController::countdown\n\n");
  this.clear();

  $('#countdown-page').css('display','block');

  var that = this;
  var currenthtml;
  playInterval = playInterval*10;

  var intervalId = setInterval(function () {
      if(playInterval == 0) {
          //  $('#ready-page').css('display','none');
          console.log("Game finished!");
          that.app.onwrite('x');
          $('#countdown-head').html("DONE!");
       } else if(playInterval < -10) {
          clearInterval(intervalId);
          //that.app.onscore();

       } else if(playInterval > 0){
          var sec = playInterval/10;
          sec = Math.floor(sec);

          if(sec < 10){
            currenthtml = "00 : 0"+sec;
          }else{
            currenthtml = "00 : "+sec;
          }
          $('#countdown-head').html(currenthtml);
          that.app.onwrite('u');
      }
      playInterval--;

  }, 100);
}

ViewController.prototype.displayScore = function(p1p,p2p,p1s,p2s) {
  console.log("\n\nViewController::displayScore\n\n");
  this.clear();

  var currenthtml = p1p+"/"+p2p+"/"+p1s+"/"+p2s;
  $('#score-page').css('display','block');
  $('#score-head').html(currenthtml);

}

ViewController.prototype.clear = function() {

  console.log("\n\nViewController::clear\n\n");
  $('#scan-page').css('display','none');
  $('#init-page').css('display','none');
  $('#ready-page').css('display','none');
  $('#countdown-page').css('display','none');

}
