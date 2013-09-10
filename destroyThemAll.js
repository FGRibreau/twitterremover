var _             = require('lodash');
var request       = require('request');
var async         = require('async');
var config        = require('./config'+(process.env.CONFIG || ''));

var endpoint      = 'http://otter.topsy.com/search.js?q=from%3A'+config.username+'&offset=10&perpage='+config.perpage+'&window=a&sort_method=-date&apikey='+config.apikey;

var onlyKeepTweet = function(tweet){
  return tweet.firstpost_date*1000 < +config.beforeDate;
};

var removeTweet   = function(tweet, f){
  request.post({
    url:"https://api.twitter.com/1.1/statuses/destroy/"+_.last(tweet.url.split('/'))+".json",
    oauth:config.oauth,
    json:true
  }, function (e, r, tweet){
    console.log(tweet.text || tweet);
    f(e, tweet);
  });
};

request.get({
  url: endpoint
}, function(err, r, resp){
  var tweets = JSON.parse(resp).response.list;

  console.log("Got", tweets.length, "tweets from Topsy");
  tweets = tweets.filter(onlyKeepTweet);
  console.log(tweets.length, "tweets will be removed");

  async.forEach(tweets, removeTweet, function(err, ok){
    console.log('That\'s all folks! Don\'t forget to follow me on Twitter @fgribreau :)', err ? '(error: '+ err +')' : '');
  });
});
