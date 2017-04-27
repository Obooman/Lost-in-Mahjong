(function(window){
	window.$ = function(selector){
		var r = document.querySelectorAll(selector);
		return r.length === 1 ? r[0] : r
	}

	window.rnd = function(n,m){
		return parseInt(Math.random()*(m-n)+n);
	}
})(this)