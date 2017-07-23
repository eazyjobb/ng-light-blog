var express = require('express'), 
	router = express.Router(), 
	render = require('../render'), 
	user_router = require('./user'), 
	secure = require('./secure'), 
	blog_pages = require('./blog-pages'),
	uploader = require('./uploader');

router.get('/', function(req, res) {
	res.send(render.test({text:"homepage"}));
});

router.use('/pages', blog_pages);
router.use('/user', user_router);
router.use('/secure', secure);
router.use('/upload', uploader);

router.use('*', function (req, res) {
	res.send(render.test({text:"404 Not Found"}));
});

module.exports = router;
