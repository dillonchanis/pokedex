//Use Node's file system
var fs = require("fs");

//Take placeholders that were put inside the HTML templates
//Replace the placeholder {} with the passed in values object
function mergeValues(values, content) {
	//Cycle over the keys of values object
	for(var key in values) {
		//Replace {} placeholders w/ values from values obj
		content = content.toString().replace("{" + key + "}", values[key]);
	}

	return content;
}

//Function to use Node's fs to serve HTML templates
function view(templateName, values, response){
	//Read from template file
	//With the asynchronous methods there is no guaranteed ordering
	//Don't want async, order matters
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {enconding: "utf8"});

	//Insert values to the content
	fileContents = mergeValues(values, fileContents);

	//Write out the contents to the response
	response.write(fileContents);
}



//Export
module.exports.view = view;