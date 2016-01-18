//Scripts to handle the webpage routing

var Profile = require("./profile.js");
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET
//This will be the Home Page
function home(request, response) {
	//if url == "/" && GET
	if(request.url === "/"){
		//show content
		response.writeHead(200, commonHeaders);
		response.write("Header\n");
		response.write("Search\n");
		response.end("Footer\n");
	}
}

//User's profile page routing
function user(request, response){
	//if url === "/{pokemon}"
	//take away the / and extract the pokemon name
	var pokemon = request.url.replace("/", "");
	//Make sure a pokemon name was entered
	if(pokemon.length > 0){
		response.writeHead(200, commonHeaders);
		response.write("Header\n");
		response.write(pokemon + "\n");
		response.end("Footer\n");
	}
}

//Export to be used in app.js
module.exports.home = home;
module.exports.user = user;