$("#snakebutton").click(requestSnakeContent);
$("#stickbutton").click(requestStickContent);
$("#aboutbutton").click(requestAboutContent);
$("#playgame").click(requestGameContent);
$("#rainbow_button").click(rainbowText);
$("#stop_button").click(stopMusic)

//COMMENTED THIS STUFF OUT BECAUSE IT DOESN'T APPEAR ANYWHERE ELSE IN main.js, index.html, OR main.css
//var audio = document.getElementById("audioControls");
//audioControls.volume = 0.05;
var isRainbow = false;
var isPlayingSong = true;

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
