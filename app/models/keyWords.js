// KeyWords object
var Tweet = require('./tweet');

// ----------------------------------------------------------------------------
function KeyWords () {
  
	this.keyWords = {}; // { key : { weight: 1, tweets: [] }}
	this.filterValue = 10;
}

// ----------------------------------------------------------------------------
KeyWords.prototype.setFilterValue = function (value) {
	this.filterValue = value;
}

// ----------------------------------------------------------------------------
KeyWords.prototype.getFilterValue = function () {
	return this.filterValue;
}

// ----------------------------------------------------------------------------
KeyWords.prototype.computeKeyWordsFromTweets = function (dataset) {
	for (var i = 0; i < dataset.length; i++) {
		var newTweet = new Tweet()
		newTweet.init(dataset[i]);
		this.computeKeyWordsFromTweet(newTweet);
	}

	// Then Filter ...
	for (key in this.keyWords) {
		if (this.keyWords[key]['value'] < this.filterValue) {
			delete this.keyWords[key];
		}
	}
}

// ----------------------------------------------------------------------------
KeyWords.prototype.computeKeyWordsFromTweet = function (data) {
	if (! data instanceof Tweet ) {
		return;
	}

	var stemmedWords = data.getStemmedWords();
	for (var key in stemmedWords) {
		this.addKeyWord(key, stemmedWords[key], data);
	}
}

// ----------------------------------------------------------------------------
KeyWords.prototype.addKeyWord = function(key, value, tweet) {
	if (this.keyWords.hasOwnProperty(key)) {
		this.keyWords[key]['value'] += value;
		this.keyWords[key]['tweets'].push(tweet);
		return
	}

	var tweets = [];
	tweets.push(tweet);
	this.keyWords[key] = {'value': value, 'tweets' : tweets };
}

// ----------------------------------------------------------------------------
KeyWords.prototype.getKeyWords = function() {
	return this.keyWords;
}


module.exports = KeyWords;
