var express = require('express');
// var api = require('../../api.js');
var router = express.Router();


var tools = require('../controllers/tools');
router.get('/tools/category/:name', tools.category);
router.get('/tools/:id', tools.show);
router.get('/tools', tools.all);
router.post('/tools', tools.create);
// router.get('/search/:term', tools.search);

var users = require('../controllers/users');
router.get('/users/:id', users.show);
router.get('/users', users.all);
router.post('/users', users.create);

module.exports = router;

