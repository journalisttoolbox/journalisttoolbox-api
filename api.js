var Tool = require('./models/tool.js');

/*Exporting functions*/

//listing all the tools
exports.list = function(req,res){
	Tool.find(function(err,tools){
		if(err) res.send(err.message);
		res.json(tools);
	});
}

//creating a new tool
exports.post = function(req,res){
	var newTool = new Tool(
				{
					title: req.body.title, 
					description:req.body.description
				}
			);
	newTool.save();

	//return all results including the new one.
	Tool.find(function(err, tools){
		if(err) res.send(err.message);
		res.json(tools);
	});
}