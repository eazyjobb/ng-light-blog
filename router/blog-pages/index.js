var express = require('express'), 
	router = express.Router(), 
	render = require('../../render');

router.get('/', function(req, res) {
	res.send(render.base({
		title: 'Pages',
		error: render.error(req.flash('error')),
		info: render.info(req.flash('info'))
	}));
});

module.exports = router;
