var express = require('express'), 
	router = express.Router(), 
	render = require('../../render');

router.get('/', function(req, res) {
	res.send(render.test({text:"pages"}));
});

module.exports = router;
