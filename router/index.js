var express = require('express'), 
	router = express.Router(), 
	render = require('../render'), 
	user = require('./user'), 
	secure = require('./secure'), 
	blog_pages = require('./blog-pages');

router.use('/', blog_pages);
router.use('/user', user);
router.use('/secure', secure);
router.use('*', function (req, res) {
	res.send(render.test({text:"404 Not Found"}));
});

module.exports = router;
