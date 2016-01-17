//Handle HTTP route GET
//This will be the Home Page
function home(request, response) {
	//if url == "/" && GET
	if(request.url === "/"){
		//show content
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Header\n");
		response.write("Search\n");
		response.end("Footer\n");
	}
}

//User's profile page routing
function user(request, response){
	//if url === "/{username}"
	//take away the / and extract the username
	var username = request.url.replace("/", "");
	//Make sure a username was entered
	if(username.length > 0){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Header\n");
		response.write(username + "\n");
		response.end("Footer\n");
	}
}

//Export to be used in app.js
module.exports.home = home;
module.exports.user = user;