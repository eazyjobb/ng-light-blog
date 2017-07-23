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
	res.send(render.upload({text:"uploader"}));
});

router.post('/', function(req, res) {
	small_upload.single('tester')(req, res, function (err) {
		if (err) {
			var err_msg = {};
			err_msg[0] = { param: err.name, msg: err.message };
			console.log(err_msg);
			res.send(render.upload({text:"uploader", error: err_msg}));
			return;
		}
		return res.send(render.test({text: 'upload succ'})), null;
	})
});

module.exports = router;
