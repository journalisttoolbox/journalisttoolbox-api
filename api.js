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

	var ArrayCategories = req.body.category.split(",");
	ArrayCategories = ArrayCategories.map(function (val) { return val; });

	var ArrayOrganizations = req.body.companies.split(",");
	ArrayOrganizations = ArrayOrganizations.map(function (val) { return val; });

	var newTool = new Tool(
				{
					name: req.body.name,
					developer: req.body.developer,	
					description: req.body.description,
					free: req.body.free,
					price: req.body.price,
					version: req.body.version,
					organization: ArrayOrganizations,
					category: ArrayCategories,
					home_url: req.body.home,
					github_url: req.body.git,
					download_url: req.body.download,
					platforms: [req.body.pc,req.body.mac,req.body.linux,req.body.web],
					upvotes: 0,
					downvotes:0
				}
			);
	newTool.save();

	//return all results including the new one.
	Tool.find(function(err, tools){
		if(err) res.send(err.message);
		res.json(tools);
	});
}