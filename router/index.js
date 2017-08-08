var express = require('express'), 
	router = express.Router(), 
	render = require('../render'), 
	user_router = require('./user'), 
	secure = require('./secure'), 
	blog_pages = require('./blog-pages'),
	uploader = require('./uploader'),
	today = require('./today'),
	avatar = require('./avatar'),
	messageboard = require('./messageboard');

router.get('/', function(req, res) {
	res.send(render.base({
		title: 'Homepage',
		error: render.error(req.flash('error')),
		info: render.info(req.flash('info'))
	}));
});

router.use('/pages', blog_pages);
router.use('/user', user_router);
router.use('/secure', secure);
router.use('/upload', uploader);
router.use('/today', today);
router.use('/getavatar', avatar);
router.use('/messageboard', messageboard);

router.use('*', function (req, res) {
	res.send(render.base({
		title: '404 Not Found',
		header: render.header({
			title: '你要访问的页面不存在',
			description: '<p>或者你在试图做些越权的事 :)</p>',
			login: req.user || false
		}),
		content: render.not_found(),
		bottom: render.bottom()
	}));
});

module.exports = router;
