checkCookie();

$("#snakebutton").click(requestSnakeContent);
$("#stickbutton").click(requestStickContent);
$("#aboutbutton").click(requestAboutContent);
$("#playgame").click(requestGameContent);
$("#newsfeed").click(requestJSONContent);
$("#rssfeed").click(requestRSSContent);

//COMMENTED THIS STUFF OUT BECAUSE IT DOESN'T APPEAR ANYWHERE ELSE IN main.js, index.html, OR main.css
//var audio = document.getElementById("audioControls");
//audioControls.volume = 0.05;
var isRainbow = false;
var isPlayingSong = false;

function xmlToJson(xml) {
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function requestRSSContent() {
  $.ajax({
    dataType:"xml",
    url: "https://cors-anywhere.herokuapp.com/https://newsfeed.zeit.de/index",
    success: loadRSSContent
  });
}

function loadRSSContent(result) {
  unloadContent();
  var HTMLstring = "<a href=''>Back to home</a><br><link href='newsstyle.css' rel='stylesheet'> <h1>Ever wondered what's going on in Deutschland? </h1>";
  var inJS = xmlToJson(result);
	console.log(inJS);
  for (var i=0;i<14;i++){
		console.log("im working "+i);
    var currentItem = inJS["rss"]["channel"]["item"][i];
    var titleString = "<h2>"+currentItem["title"]["#text"]+"</h2>";
		HTMLstring += titleString;
    var dateString = "<p>Written on "+currentItem["pubDate"]["#text"]+"</p>";
		HTMLstring += dateString;
    var linkString = "<a href="+currentItem["link"]["#text"]+">Visit article</a>"
		HTMLstring += linkString;
  }
	$("#rss_feed_content").html(HTMLstring);
}


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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires +";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
	//credit for these 3 functions goes to w3. great stuff
  var user = getCookie("username");
  if (user != "") {
		console.log(document.cookie);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
			console.log(document.cookie);
    }
  }
}
