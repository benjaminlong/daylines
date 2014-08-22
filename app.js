var express = require('express'),
  config = require('./config/config');

var Twitter = require('twitter-js-client');

var app = express();

require('./config/express')(app, config);

app.listen(config.port);

