var express = require('express');
var api = require('../../api.js');
var router = express.Router();

/* GET home page. */
router.get('/', api.list);
router.get('/:id', api.single);
router.get('/category/:name', api.category);
router.post('/', api.post);

module.exports = router;
