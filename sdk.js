// SDK
(function(window, undefined) {
	var BaP = {};
	if (window.BaP) {
		return;
	}	
	BaP.init = function(callback) {		
		loadStylesheet('http://localhost:85/BaPSDK/BaP.css');
		loadStylesheet('http://localhost:85/BaPSDK/jquery.datetimepicker.css');
		loadScript('http://localhost:85/BaPSDK/jquery.js', function()
		{
			loadScript('http://localhost:85/BaPSDK/jquery.datetimepicker.full.js', function()
			{
				loadScript('http://localhost:85/BaPSDK/sdk_lib.js', callback);
			});			
		});		
	};
	function loadScript(src, callback)
	{
	  var script, isReady;
	  isReady = false;
	  script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.src = src;
	  script.onload = script.onreadystatechange = function() {
		//console.log( this.readyState ); //uncomment this line to see which ready states are called.
		if ( !isReady && (!this.readyState || this.readyState == 'complete') )
		{
		  isReady = true;
		  callback();
		}
	  };
	  document.body.appendChild(script);
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


