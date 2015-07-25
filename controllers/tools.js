var Tool = require("../models/tool.js");

/*Exporting functions*/

//listing all the tools
exports.all = function(req,res){
	Tool.find(function(err,tools){
		if(err) res.send(err.message);
		res.json(tools);
	});
};

// getting one tool by id
exports.show = function(req,res){
	Tool.findOne({'_id': req.params.id}, function(err,tool){
    if(!tool) {
      // If tool is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }

		if(err) res.send(err.message);
		res.json(tool);
	});
};

// listing all tools of a category
exports.category = function(req,res){
	Tool.find({'category': new RegExp('^'+req.params.name+'$', "i")}, function(err, tools){
		if(err) res.send(err.message);
		res.json(tools);
	});
};

// Method for PUT requests
exports.put = function(req, res) {
  Tool.findOne({ '_id': req.params.id }, function(err, tool) {
    if(!tool) {
      // If tool is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }    
    if(err) {
      res.send(err.message);
    } else {

      // Update all fields
      for(var field in req.body) {
        tool[field] = req.body[field];
      }

      tool.save(function(err) {
        if(err) {
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', tool: tool });
        }
      });
    }
  });
};

// Method for DELETE requests
exports.delete = function(req, res) {
  Tool.findOne({ '_id': req.params.id }, function(err, tool) {
    if(!tool) {
      // If tool is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    if(err) {
      res.send(err.message);
    } else {
      tool.remove(function(err) {
        if (err) {
          // If removed unsuccessfully
          res.statusCode = 500;
          return res.send({ error: 'Server error' });
        } else {
          // if removed successfully
          return res.send({ status: 'OK' });
        }
      });
    }
  });
};

//creating a new tool
exports.create = function(req,res){

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
};


// exports.search = function(req, res){
// 	var regex = new RegExp(req.params.term, 'i');
// 	Tool.find({$or : [{'category': regex}, {'name': regex}, {'description': regex}, {'developer': regex}]}, function(err,tools){
// 		if(err) res.send(err.message);
// 		res.json(tools);
// 	});
// }
