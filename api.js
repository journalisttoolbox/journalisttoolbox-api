var Tool = require('./models/tool.js');

/*Exporting functions*/

//listing all the tools
exports.list = function(req,res){
	Tool.find(function(err,tools){
		if(err) res.send(err.message);
		res.set('Access-Control-Allow-Origin','*');
		res.json(tools);
	});
}

exports.single = function(req,res){
	Tool.findOne({'_id': req.params.id}, function(err,tool){
		if(err) res.send(err.message);
		res.set('Access-Control-Allow-Origin','*');
		res.json(tool);
	});
}

exports.search = function(req, res){
	var regex = new RegExp(req.params.term, 'i');
	Tool.find({$or : [{'category': regex}, {'name': regex}, {'description': regex}, {'developer': regex}]}, function(err,tools){
		if(err) res.send(err.message);
		res.set('Access-Control-Allow-Origin', '*');
		res.json(tools);
	});
}

exports.category = function(req,res){
	console.log(req.params.name);
	Tool.find({'category': new RegExp('^'+req.params.name+'$', "i")}, function(err, tools){
		if(err) res.send(err.message);
		res.set('Access-Control-Allow-Origin','*');
		res.json(tools);
	});
}

//creating a new tool
exports.post = function(req,res){
	var newTool = new Tool(
				{
					name: req.body.title, 
					description: req.body.description
				}
			);
	newTool.save();

	//return all results including the new one.
	Tool.find(function(err, tools){
		if(err) res.send(err.message);
		res.json(tools);
	});
}