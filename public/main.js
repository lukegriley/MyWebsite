$("#snakebutton").click(requestSnakeContent);
$("#stickbutton").click(requestStickContent);
$("#aboutbutton").click(requestAboutContent);

function requestSnakeContent() {
  $.ajax({url: "snakegame.html", success: loadContent});
}

function requestStickContent() {
  $.ajax({url: "StickNinja.html", success: loadContent});
}
function requestAboutContent() {
  $.ajax({url: "about.html", success: loadContent});
}

function loadContent(result) {
  unloadContent();
  $("#mainContainer").html(result);
}

function unloadContent() {
  $("#mainContainer").html('');
}
