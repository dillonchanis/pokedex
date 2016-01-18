var fs = require("fs");

function view(templateName, values, response){
	//Read from template file
	//Don't want async, order matters
	var fileContents = fs.readFileSync('./views/' + templateName + '.html');

	//Insert values to the content

	//Write out the contents to the response
	response.write(fileContents);
}

//Export
module.exports.view = view;