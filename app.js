//Require the router files


//Create the web server
var http = require("http");
http.createServer(function(request, response){
	response.end("It works!");
}).listen(8080);

console.log('The server is running.');"C:\Users\Owner\Documents\Professional\Instagram"