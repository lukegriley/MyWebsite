$("#snakebutton").click(requestSnakeContent);
$("#stickbutton").click(requestStickContent);
$("#aboutbutton").click(requestAboutContent);
$("#playgame").click(requestGameContent);

var audio = document.getElementById("audioControls");
audioControls.volume = 0.05;


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

function loadContent(result) {
  unloadContent();
  $("#mainContainer").html(result);
}
function loadGameContent(result) {
  unloadContent();
  $("#game_content").html(result);
}

function unloadContent() {
  $("#mainContainer").html('');
}
