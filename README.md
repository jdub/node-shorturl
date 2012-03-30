Simple URL shortener client library for node.js
===============================================

[shorturl](https://github.com/jdub/node-shorturl) is a simple, asynchronous client library for common URL shortener services. It currently supports: arseh.at, bit.ly, goo.gl, is.gd, v.gd and string substitution links (with %@). It includes a perky little script for shortening URLs on the command line, also named [shorturl](https://github.com/jdub/node-shorturl/blob/master/shorturl).

If you [need to go deeper](http://www.imdb.com/title/tt1375666/), try the more complete client libraries for individual services such as [node-bitly](https://github.com/tanepiper/node-bitly) or [node-googl](https://github.com/ukstv/node-googl).


## Requirements

You can install node-shorturl and its dependencies with npm: `npm install shorturl`. Otherwise, manually install:

- [node](http://nodejs.org/) 0.6+
- [request](https://github.com/mikeal/request) 2.9+
- [optimist](https://github.com/substack/node-optimist) 0.3.1

## Examples

	var shorturl = require('shorturl');
	shorturl('http://bethesignal.org/', function(result) {
		console.log(result);
	});

By default it will shorten URLs with is.gd, but you can choose an alternative service and pass parameters:

	shorturl('http://bethesignal.org/', 'bit.ly', {
		login: 'STATE YOUR NAME',
		apiKey: 'STATE YOUR IDENTIFICATION NUMBER'
	}, function(result) {
		console.log(result);
	});

Simple services can be described using a string substitution link. Pass the entire link as the service name; '%@' will be replaced with your URL:

	var arsehat = 'http://arseh.at/api.php?action=shorturl&format=simple&url=%@';
	shorturl('http://bethesignal.org/', arsehat, function(result) {
		console.log(result);
	});

## Command line script

	$ shorturl
	Usage: shorturl [options] <longurl>

	$ shorturl --service=goo.gl --key=STATE_YOUR_ID_NUMBER http://bethesignal.org/
	http://goo.gl/dgTLo

	$ ARSEHAT="http://arseh.at/api.php?action=shorturl&format=simple&url=%@"
	$ shorturl --service=$ARSEHAT https://github.com/jdub/node-shorturl
	http://arseh.at/3yd

Display the built-in command line documentation with `shorten --help`.
