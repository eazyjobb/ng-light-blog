var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'), 
	authorized = require('../authorized');

router.use(authorized({isAdmin: true}));

router.get('/', function (req, res) {
	res.send(render.base({
		title: 'Secure',
		error: render.error(req.flash('error')),
		info: render.info(req.flash('info'))
	}));
});

router.get('/debug/', function (req, res) {
	res.send(render.base({
		title: 'debug error test',
		header: render.header(),
		content: render.debug(),
		author: render.author(),
		error: render.error([
			'incorrect password', 
			'user does not exist', 
			'incorrect password', 
			'server error'
		]),
		info: render.info([
			'login success', 
			'upload success', 
			'something good'
		]),
		bottom: render.bottom()
	}));
})

module.exports = router;
