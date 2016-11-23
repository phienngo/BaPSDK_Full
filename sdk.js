// SDK
(function(window, undefined) {
	var BaP = {};
	if (window.BaP) {
		return;
	}	
	BaP.init = function(callback) {		
		loadStylesheet('http://localhost:85/BaPSDK/BaP.css');
		loadScript('http://localhost:85/BaPSDK/sdk_lib.js', callback);
	};
	function loadScript(path, callback) {
		var done = false;
		var scr = document.createElement('script');

		scr.onload = handleLoad;
		scr.onreadystatechange = handleReadyStateChange;
		scr.onerror = handleError;
		scr.src = path;
		document.body.appendChild(scr);

		function handleLoad() {
			if (!done) {
				done = true;
				callback(path, "ok");
			}
		}
		function handleReadyStateChange() {
			var state;

			if (!done) {
				state = scr.readyState;
				if (state === "complete") {
					handleLoad();
				}
			}
		}
		function handleError() {
			if (!done) {
				done = true;
				callback(path, "error");
			}
		}
	}
	function loadStylesheet(url) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		var entry = document.getElementsByTagName('script')[0];
		entry.parentNode.insertBefore(link, entry);
	}

	window.BaP = BaP;
})(this);


