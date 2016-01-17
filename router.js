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

//Export to be used in app.js
module.exports.home = home;