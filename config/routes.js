var express = require('express'),
	auth = require('./auth');
var router = express.Router();


var tools = require('../controllers/tools');
router.get('/api/tools/category/:name', tools.category);
router.get('/api/tools/:id', tools.show);
router.get('/api/tools', tools.all);
router.post('/api/tools', tools.create);
// router.get('api/search/:term', tools.search);

var users = require('../controllers/users');
router.get('/api/users/:id', users.show);
router.get('/api/users', users.all);
router.post('/api/users', users.create);

// Session Routes
var session = require('../controllers/session');
router.get('/api/session', auth.ensureAuthenticated, session.session);
router.post('/api/session', session.login);
router.delete('/api/session', session.logout);

module.exports = router;

