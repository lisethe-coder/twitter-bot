'use strict';
var Twit = require('twit');
var request = require('request');

var T = new Twit({
	consumer_key: 'kBUm7idXXQcQ7Zbmgq8kiVizl',
  	consumer_secret: 't2Zv0jmJemWmLWr8pU0YgYMBP1vtLVKh0vjT9DXgaInoz12PTo',
  	access_token: '457753246-rNoN65iRFlBSOoqzfzUby5nkPyNlXzKpe7XW5xQ5',
  	access_token_secret: 'bRZS987NfwflrJeXn1vcJVDLWYjdQgjKoQzYtyH5s1ZfN'
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
