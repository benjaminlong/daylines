var express = require('express'),
  router = express.Router();

var fs = require("fs");
var Twitter = require('twitter-js-client').Twitter;
var KeyWords = require('../models/keyWords');

var LRU = require("lru-cache")
  , options = { maxAge: 12000 * 60 * 60 }
  , cache = LRU(options)
  , otherCache = LRU(50) // sets just the max size

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    var keyWords = new KeyWords();
    keyWords.setFilterValue(12);

    if (cache.has('frenchDataset')) {
        var dataset = cache.get('frenchDataset');
    }
    else {
        var dataset = [];
        cache.set('frenchDataset', dataset);
        var config = JSON.parse(fs.readFileSync('./config/twitter.js'), encoding="ascii");
        var twitter = new Twitter(config);

        var twitterUsernames = JSON.parse(fs.readFileSync('./config/frenchNews.json'), encoding="ascii");

        var error = function (err, response, body) {
          console.log('ERROR [%s]', err);
        };
        var success = function (data) {
          // fs.writeFile('./config/' + name + '.json', data, encoding='ascii');
          var dataset = cache.get('frenchDataset');
          cache.set('frenchDataset', dataset.concat(JSON.parse(data)));
        };

        for (var i = 0; i < twitterUsernames.length; i ++) {
            twitterUsername = twitterUsernames[i];
            twitter.getUserTimeline(
              { screen_name: twitterUsernames[i], count: '100'}, error, success);
        }
    }

    keyWords.computeKeyWordsFromTweets(dataset);
    var merged = keyWords.mergeKeyWords();
    var topics = keyWords.createTopics(merged);

    var maxTopics = topics.length > 6 ? 6 : topics.length;

    res.render('index', {
      title: 'daylines',
      topics: topics,
      maxTopics: maxTopics
    });
});
