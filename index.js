var VERSION = '0.0.3',
	request = require('request'),
	querystring = require('querystring').stringify;

function shorturl(longurl, shorter, params, callback) {
	// callback passed in params
	if ( typeof params === 'function' ) {
		callback = params;
		params = {};
	}
	// callback passed in shorter
	if ( typeof shorter === 'function' ) {
		callback = shorter;
		params = {};
		shorter = 'is.gd';
	// params passed in shorter
	} else if ( typeof shorter === 'object' ) {
		params = shorter;
		shorter = 'is.gd';
	}

	// check shorter validity
	if ( shorter in shorteners ) {
		// short circuit the rest of the checks to avoid match()
	} else if ( !shorter ) {
		shorter = 'is.gd';
	} else if ( shorter.match(/^https?:\/\/.*%@/) ) {
		params.url = shorter;
		shorter = 'string';
	} else {
		shorter = 'is.gd';
	}

	if ( typeof callback === 'function' ) {
		shorteners[shorter](longurl, params, callback);
	} else {
		// FIXME: explode usefully here?
	}
}
module.exports = shorturl;

var shorteners = {
	'arseh.at': function(longurl, params, callback) {
		params.url = 'http://arseh.at/api.php?action=shorturl&format=simple&url=%@';
		shorteners['string'](longurl, params, callback);
	},

	'bit.ly': function(longurl, params, callback) {
		if ( !(params.login && params.apiKey) ) {
			callback(new Error("bit.ly requires a user and apiKey for authorisation."));
			return;
		}

		var uri = 'https://api-ssl.bit.ly/v3/shorten?' + querystring({
			login: params.login || null,
			apiKey: params.apiKey || null,
			longUrl: longurl,
			format: 'json'
		});
		request({uri:uri}, function(error, response, body) {
			if ( response && response.statusCode === 200 ) {
				try {
					var json = JSON.parse(body);
					if ( json.data && json.data.url )
						callback(json.data.url, json);
				} catch(e) {
					// FIXME: e vs. error? kinda stupid
					callback(e, error, response, body);
				}
			} else {
				callback.call(arguments);
			}
		});
	},

	'goo.gl': function(longurl, params, callback) {
		request({
			uri: 'https://www.googleapis.com/urlshortener/v1/url',
			method: 'POST',
			json: {longUrl:longurl}
		}, function(error, response, body) {
			if ( response && response.statusCode === 200 && body.id ) {
				callback(body.id);
			} else {
				callback.call(arguments);
			}
		});
	},

	'is.gd': function(longurl, params, callback) {
		var host = 'http://is.gd/';
		if ( 'host' in params && ['is.gd', 'v.gd'].indexOf(params.host) >= 0 ) {
			host = 'http://' + params.host + '/';
			delete params.host;
		}
		var uri = host + 'create.php?' + querystring({
			format: 'simple',
			url: longurl
		});
		request({uri:uri}, function(error, response, body) {
			if ( response && response.statusCode === 200 && body.substr(0, host.length) === host ) {
				callback(body);
			} else {
				callback.call(arguments);
			}
		});
	},

	'v.gd': function(longurl, params, callback) {
		params.host = 'v.gd';
		shorteners['is.gd'](longurl, params, callback);
	},

	'string': function(longurl, params, callback) {
		if ( !('url' in params) ) {
			callback();
			return;
		}

		var uri = params.url.replace('%@', escape(longurl));
		request({uri:uri}, function(error, response, body) {
			if ( response && response.statusCode === 200 ) {
				callback(body);
			} else {
				callback.call(arguments);
			}
		});
	}
};
