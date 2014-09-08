var express = require('express'),
  router = express.Router();

var fs = require("fs");
var Twitter = require('twitter-js-client').Twitter;
var KeyWords = require('../models/keyWords');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    var keyWords = new KeyWords();
    keyWords.setFilterValue(10);

    var dataset_0 = JSON.parse(fs.readFileSync('./config/dataset_0.json', encoding="ascii"));
    var dataset_1 = JSON.parse(fs.readFileSync('./config/dataset_1.json', encoding="ascii"));
    var dataset_2 = JSON.parse(fs.readFileSync('./config/dataset_2.json', encoding="ascii"));
    var dataset_3 = JSON.parse(fs.readFileSync('./config/dataset_3.json', encoding="ascii"));

    var dataset = [];
    dataset = dataset.concat(dataset_0);
    dataset = dataset.concat(dataset_1);
    dataset = dataset.concat(dataset_2);
    dataset = dataset.concat(dataset_3);

    keyWords.computeKeyWordsFromTweets(dataset);
    var merged = keyWords.mergeKeyWords();
    var topics = keyWords.createTopics(merged);

    console.log("**************************************************");
    console.log("topics : ");
    console.log(topics);

    res.render('index', {
      title: 'daylines',
      topics: topics
    });


    // var twitter = new Twitter(config);

  // console.log(twitter);

 //  var error = function (err, response, body) {
 //    console.log('ERROR [%s]', err);
 //  };
 //  var success = function (data) {
	// console.log('Data [%s]', data);
 //  };

 //  twitter.getUserTimeline(
 //  	{ screen_name: 'Le_Figaro', count: '50'}, error, success);


});
