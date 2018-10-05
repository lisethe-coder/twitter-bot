'use strict';
var Twit = require('twit');
var request = require('request');
require('dotenv').config();

var T = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
  	consumer_secret: process.env.TWITTER_SECRET_KEY,
  	access_token: process.env.TWITTER_ACCESS_TOKEN,
  	access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=123456&format=text&lang=en';

/* These kind of applications have to make a request. The best way will be to: 
- Call a function to make a request 
- Send data from response to another function to tweet
- tweet the data
*/

function getQuote(callback) {
	request(url, function(error, response, body) {
		console.log('error:', error); // Print error if one occurre
		console.log('statusCode:', response && response.statusCode);
		console.log('body:', body);
		callback(body);
	});
}

function postTweet(tweet) {
	console.log(tweet);
	T.post('statuses/update', { status: tweet }, function(err, data, response) {
		console.log(data);
	});
}

getQuote(postTweet);
