Simple URL shortener client library for node.js
===============================================

[shorturl](https://github.com/jdub/node-shorturl) is a simple, asynchronous client library for common URL shortener services. It currently supports: arseh.at, bit.ly, goo.gl, is.gd, v.gd and string substitution links (with %@).

If you [need to go deeper](http://www.imdb.com/title/tt1375666/), try the more complete client libraries for individual services such as [node-bitly](https://github.com/tanepiper/node-bitly) or [node-googl](https://github.com/ukstv/node-googl).

It includes a perky little script for shortening URLs on the command line, also named [shorturl](https://github.com/jdub/node-shorturl/blob/master/shorturl).

## Requirements

You can install node-shorturl and its dependencies with npm: `npm install shorturl`. Otherwise, manually install:

- [node](http://nodejs.org/) 0.2+
- [request](https://github.com/mikeal/request) 1.2+
- [tav](https://github.com/akaspin/tav) 0.1.0

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

## Command line script

	$ shorturl
	Usage: shorturl [options] <longurl>

	$ shorturl --service=goo.gl --key=STATE_YOUR_ID_NUMBER http://bethesignal.org/
	http://goo.gl/dgTLo

Display the built-in help with `shorten --help`.
