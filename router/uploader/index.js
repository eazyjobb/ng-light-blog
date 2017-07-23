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
	res.send(render.upload({
		text:"uploader",
		error: req.flash('error'),
		info: req.flash('info')
	}));
});

router.post('/', function(req, res) {
	small_upload.single('tester')(req, res, function (err) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/upload');
			return;
		}
		return res.send(render.test({text: 'upload succ'})), null;
	})
});

module.exports = router;
