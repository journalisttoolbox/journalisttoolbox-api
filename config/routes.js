var express = require('express'),
	auth = require('./auth');
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

// Session Routes
var session = require('../controllers/session');
router.get('/session', auth.ensureAuthenticated, session.session);
router.post('/session', session.login);
router.delete('/session', session.logout);

module.exports = router;

