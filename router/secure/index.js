var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'), 
	authorized = require('../authorized');

router.use(authorized({isAdmin: true}));

router.get('/', function(req, res) {
	res.send(render.test({text:"secure"}));
});

module.exports = router;
