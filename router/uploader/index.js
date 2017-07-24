var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	multer  = require('multer'),
	small_upload = multer({ dest: 'tmp/', limits: {
		fileSize: 50000
	}}),
	authorized = require('../authorized');

router.use(authorized());

router.get('/', function(req, res) {
	res.send(render.base({
		title: 'Upload',
		content: render.upload(),
		error: render.error(req.flash('error')),
		info: render.info(req.flash('info'))
	}));
});

router.post('/', function(req, res) {
	small_upload.single('tester')(req, res, function (err) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/upload');
			return;
		}
		req.flash('info', 'Upload successful');
		res.redirect('/user');
		return null;
	})
});

module.exports = router;
