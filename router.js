//Scripts to handle the webpage routing

var Profile = require("./profile.js");
var renderer = require("./renderer.js");

var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET
//This will be the Home Page
function home(request, response) {
	//if url == "/" && GET
	if(request.url === "/"){
		//show content
		response.writeHead(200, commonHeaders);
		renderer.view("header", {}, response);
		renderer.view("search", {}, response);
		renderer.view("footer", {}, response);
		response.end();
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
			response.write(values.pokeName + " is of type " + values.pokeType + " and is number " + values.pokeId + 
				". Sprite(" + values.pokeSprite + ")\n");
			response.end("Footer\n");
		});

		//on error
		pokemonProfile.on("error", function(error){
			//show error
			response.write(error.message + "\n");
			response.end("Footer\n");
		});
	}
}

//Export to be used in app.js
module.exports.home = home;
module.exports.user = user;