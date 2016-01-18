//Scripts to handle the webpage routing

var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET
//This will be the Home Page
function home(request, response) {
	//if url == "/" && GET
	if(request.url === "/"){
		if(request.method.toLowerCase() === 'get'){
			//show content
			response.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		} else{
			//if url === "/" && POST
			//get POST data from body
			request.on("data", function(postBody){
				//extract the pokemon's name
				var query = querystring.parse(postBody.toString());
				//Redirect to the pokemon name
				response.writeHead(303, {"Location": "/" + query.pokemon});
				response.end();
			});
		}
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
		renderer.view("header", {}, response);

		//get the JSON data from the pokemon API
		var pokemonProfile = new Profile(pokemon);
		pokemonProfile.on("end", function(profileJSON){
			var values = {
				pokeSprite : "http://pokeapi.co/media/img/" + profileJSON.pkdx_id + ".png",
				pokeName : profileJSON.name,
				pokeType : profileJSON.types.name,
				pokeId : profileJSON.pkdx_id
			}

			//simple response
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();
		});

		//on error
		pokemonProfile.on("error", function(error){
			//show error
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});
	}
}


//Export to be used in app.js
module.exports.home = home;
module.exports.user = user;