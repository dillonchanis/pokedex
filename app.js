//Require the router files
var router = require("./router.js");

//Create the web server
var http = require("http");
http.createServer(function(request, response){
	//Route to home page
	router.home(request, response);
	//Route to user page
	router.user(request, response);
}).listen(8080);//Listening on PORT 8080, can place your own

//Log to the command prompt that the server is running
console.log('The server is running.');