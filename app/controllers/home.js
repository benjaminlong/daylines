var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

var fs = require("fs");
var Twitter = require('twitter-js-client').Twitter;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {


  // var config = JSON.parse(fs.readFileSync('./config/twitter.js', encoding="ascii"));
  // console.log(config)

  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
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

  var tweets = JSON.parse(fs.readFileSync('./config/dataset.json', encoding="ascii"));
  
  console.log(tweets);
  
});
