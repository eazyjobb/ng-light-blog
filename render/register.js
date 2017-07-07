(function(){function register(it
/**/) {
var out='<!doctype html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>login</title></head><body>';for (var error in it) { out+='<div> '+(it[error].param+':'+it[error].msg)+' </div>';}                       out+='<h2 class="page-header">Register</h2><form method="post" action="/user/register"><div class="form-group"><label>UserID</label><input type="text" class="form-control" name="user_name" placeholder="Username"></div><div class="form-group"><label>Name</label><input type="text" class="form-control" name="name" placeholder="Name"></div><div class="form-group"><label>E-mail</label><input type="email" class="form-control" name="email" placeholder="E-mail"></div><div class="form-group"><label>Password</label><input type="password" class="form-control" name="password" placeholder="Password"></div><div class="form-group"><label>Repeat Password</label><input type="password" class="form-control" name="password-rep" placeholder="Password"></div><button type="submit" class="btn btn-default">Submit</button></form></body></html>';return out;
}var itself=register, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {_page.render=_page.render||{};_page.render['register']=itself;}}());