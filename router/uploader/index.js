var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	multer  = require('multer'),
	small_upload = multer({ dest: 'tmp/', limits: {
		fileSize: 1024 * 1024,

	}}),
	authorized = require('../authorized'),
	fs = require('fs'),
	sharp = require('sharp');

router.use(authorized());

router.post('/avatar/', function(req, res) {
	small_upload.single('avatar')(req, res, function (err) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/user');
			return;
		}

		if (req.file == undefined) {
			req.flash('error', 'pick a pic, please!');
			res.redirect('/user');
			return;
		}

		var swd = './static/user/' + req.user._id;
		var mime = '.' + req.file.originalname.split('.').pop();

		fs.mkdir(swd, function (err) {
			if (err && err.code != 'EEXIST') {
				console.log(err.code);
				throw err;
			}

			sharp('./tmp/' + req.file.filename)
				.resize(256, 256)
				.jpeg({quality:100})
				.toFile(swd + '/avatar.jpg');

			req.flash('info', 'Upload Avatar successful');
			res.redirect('/user');
		});

		return null;
	});
});

module.exports = router;
