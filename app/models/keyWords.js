// KeyWords object
var Tweet = require('./tweet');
var Topic = require('./topic');

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

// ----------------------------------------------------------------------------
KeyWords.prototype.mergeKeyWords = function () {
	var topic = []; // { [], [], [] }

	var copy = this.keyWords
;
	if (!this.keyWords) {
		console.log('Error: nothing to merge');
		return;
	}

	// var keys = this.keyWords.keys();
	var mapping = {};
	for (var key in this.keyWords) {
		mapping[key] = -1;
	}

	var index = 0;
	for (var key in this.keyWords) {
		for (var keyCopy in copy) {
			if (key != keyCopy) {
				var nb = nbOfCommunTweet(this.keyWords[key]['tweets'], this.keyWords[keyCopy]['tweets']);

				if (nb >= 6) {

					if (mapping[key] == -1) { // not yet in the merge table
						mapping[key] = topic.length;
						topic.push([key]);
					}

					mapping[keyCopy] = mapping[key];
					if (topic[mapping[keyCopy]].indexOf(keyCopy) == -1) {
						topic[mapping[keyCopy]].push(keyCopy);
					}
				}
			}
		}

		// delete copy[key];

		index = topic.length == index + 1 ? index + 1 : index;
	}

	return topic;
}

// ----------------------------------------------------------------------------
KeyWords.prototype.createTopics = function(mergedKeyWords) {
    var topics = [];

    for (var i = 0; i < mergedKeyWords.length; i++) {
        var topic = new Topic();
        topic.addKeyWords(mergedKeyWords[i]);
        for (var j = 0; j < mergedKeyWords[i].length; j++) {
            var key = mergedKeyWords[i][j];
            topic.addTweets(this.keyWords[key]['tweets']);
        }

        topics.push(topic);
    }

    return topics;
}

// ----------------------------------------------------------------------------
function nbOfCommunTweet(array1, array2) {
	// todo: optimized this code ! O(N2) BAD !
	var result = 0;

	for (var i = 0; i < array1.length; i++) {
		for (var j = 0; j < array2.length; j++) {

			if (array1[i] instanceof Tweet &&
					array2[j] instanceof Tweet &&
					array1[i].getId() == array2[j].getId() ) {
				result++;
			}
		}
	}

	return result;
}

module.exports = KeyWords;
