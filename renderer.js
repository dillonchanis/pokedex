var fs = require("fs");

function mergeValues(values, content) {
	//Cycle over the keys of values object
	for(var key in values) {
		//Replace {} placeholders w/ values from values obj
		content = content.toString().replace("{" + key + "}", values[key]);
	}

	return content;
}

function view(templateName, values, response){
	//Read from template file
	//Don't want async, order matters
	var fileContents = fs.readFileSync('./views/' + templateName + '.html');

	//Insert values to the content
	fileContents = mergeValues(values, fileContents);

	//Write out the contents to the response
	response.write(fileContents);
}



//Export
module.exports.view = view;