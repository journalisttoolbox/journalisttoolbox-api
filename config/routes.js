var express = require('express'), 
    passport = require('passport'),
    auth    = require('../auth/auth.service'),
    tools   = require('../controllers/tools'),
    users   = require('../controllers/users');

var router  = express.Router();

// TOOLS
router.get('/api/tools/category/:name', tools.category);
router.get('/api/tools/:id', tools.show);
router.get('/api/tools', tools.all);
router.post('/api/tools', tools.create);
router.delete('/api/tools/:id', tools.delete);
router.put('/api/tools/:id', tools.put);

// USERS
router.get('/api/users', users.all);
router.get('/api/users/:id', users.show);
router.post('/api/users', users.create);
router.delete('/api/users/:id', users.delete);
router.put('/api/users/:id', users.put);
router.get('/api/users/me', auth.isAuthenticated(), users.get);

module.exports = router;

