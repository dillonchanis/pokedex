var http = require("http");
var EventEmitter = require("events").EventEmitter;
var util = require("util");

//Function to get Pokemon Info
function Profile(pokemon) {

	EventEmitter.call(this);

    profileEmitter = this;

	//Connect to the API
	var request = http.get("http://pokeapi.co/api/v1/pokemon/" + pokemon.toLowerCase() + "/", function(response){
	
		//Will hold the data that streams in
		var body = "";

		//Connection error
		if(response.statusCode !== 200){
			//abort the request
			request.abort();
			//Give error message + ({statuscode in here})
			profileEmitter.emit("error", new Error("There was an error getting the information for" + pokemon + ". (" +
				http.STATUS_CODES[response.statusCode] + ")"));
		}//end of connection error

		//Read the data chunks we recieve back in our 'body' var.
		//This will be a string 
		response.on('data', function(chunk){
			body += chunk;
			profileEmitter.emit("data", chunk);
		});

		//Use JSON.parse() to convert our body string
		//To an object so we can access programatically
		response.on('end', function(){
			//if connection is good
			//TRY to parse the data into JSON object
			if(response.statusCode === 200){
				try {
					var profile = JSON.parse(body);
					profileEmitter.emit("end", profile);
				} catch (error) {
					profileEmitter.emit("error", error);
				}
			}
		}).on("error", function(error){
			profileEmitter.emit("error", error);
		});
	});//end of request

}//end of Profile

util.inherits( Profile, EventEmitter );

//Export
module.exports = Profile;