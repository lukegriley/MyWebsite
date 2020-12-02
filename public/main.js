$("#snakebutton").click(requestSnakeContent);
$("#stickbutton").click(requestStickContent);
$("#aboutbutton").click(requestAboutContent);
$("#playgame").click(requestGameContent);
$("#newsfeed").click(requestJSONContent);

//COMMENTED THIS STUFF OUT BECAUSE IT DOESN'T APPEAR ANYWHERE ELSE IN main.js, index.html, OR main.css
//var audio = document.getElementById("audioControls");
//audioControls.volume = 0.05;
var isRainbow = false;
var isPlayingSong = false;

function requestSnakeContent() {
  $.ajax({url: "snakegame.html", success: loadContent});
}

function requestStickContent() {
  $.ajax({url: "StickNinja.html", success: loadContent});
}
function requestAboutContent() {
  $.ajax({url: "about.html", success: loadContent});
}
function requestGameContent() {
  $.ajax({url: "game.html", success: loadGameContent});
}

function requestRainbowContent() {
  console.log("reached inside of requestRainbowContent function");
  $.ajax({url: "index.html", success: rainbowText});
}

function requestJSONContent() {
  console.log('requesting json');
  $.ajax({
    dataType:"json",
    url: "blogArticles.json",
    success: loadJSONContentAsHTML
  });
}

function loadJSONContentAsHTML(result) {
  var newHTMLString = "<link href='newsstyle.css' rel='stylesheet'> <a href=''>Back to home</a>";
  for (var i=0;i<result.length;i++){
    var headline = result[i]['headline'];
    var author = result[i]['author'];
    var body = result[i]['body'];
    var likes = result[i]['numberOfLikes'];
    var date = result[i]['date'];

    newHTMLString += "<h1>"+headline+"</h1>";
    newHTMLString += "<h3>Written by "+author+" on "+date+"</h3>";
    newHTMLString += "<h3>Number of likes:"+likes+"</h3>";
    newHTMLString += "<p>"+body+"<p><br>";


  }
  unloadContent();
  $("#news_feed_content").html(newHTMLString);

}

function loadContent(result) {
  unloadContent();
  $("#mainContainer").html(result);
}
function loadGameContent(result) {
  unloadContent();
  $("#game_content").html(result);
}

function rainbowText() {
  if(isRainbow == false) {
    document.getElementById("firstHeading").style = "background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red); -webkit-background-clip: text; color: transparent;";
    isRainbow = true;
  }
  else if(isRainbow == true) {
    document.getElementById("firstHeading").style.color = "white";
    isRainbow = false;
  }
}

function stopMusic() {
  if(isPlayingSong == true) {
    document.getElementById("audioSong").pause();
    isPlayingSong = false;
  }
  else if(isPlayingSong == false) {
    document.getElementById("audioSong").play();
    isPlayingSong = true;
  }
}

function unloadContent() {
  $("#mainContainer").html('');
}
