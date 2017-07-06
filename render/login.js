(function(){function login(it
/**/) {
var out='<!doctype html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>login</title></head><body><h2 class="page-header">Account Login</h2><form method="post" action="/user/login"><div class="form-group"><label>Username</label><input type="text" class="form-control" name="username" placeholder="Username"></div><div class="form-group"><label>Password</label><input type="password" class="form-control" name="password" placeholder="Password"></div><button type="submit" class="btn btn-default">Submit</button></form></body></html>';return out;
}var itself=login, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {_page.render=_page.render||{};_page.render['login']=itself;}}());