// Topic object

// ----------------------------------------------------------------------------
function Topic (opts) {
  if(!opts) opts = {};
  
	this.tweets = [];
	this.keyWords = [];
	this.imageUrl = '';
}

// ----------------------------------------------------------------------------
Topic.prototype.setTweets = function (tweets) {
	this.tweets = tweets;
}

// ----------------------------------------------------------------------------
Topic.prototype.getTweets = function () {
	return this.tweets;
}

// ----------------------------------------------------------------------------
Topic.prototype.addTweets = function (tweets) {
	for (var i = 0; i < tweets.length; i++) {
		this.addTweet(tweets[i]);
	}
}

// ----------------------------------------------------------------------------
Topic.prototype.addTweet = function (tweet) {
	if (this.hasTweet(tweet)) {
		return;
	}

	this.tweets.push(tweet);
}

// ----------------------------------------------------------------------------
Topic.prototype.removeTweets = function (tweets) {
	for (var i = 0; i < tweets.length; i++) {
		this.removeTweet(tweets[i]);
	}
}

// ----------------------------------------------------------------------------
Topic.prototype.removeTweet = function (tweet) {
	if (!this.hasTweet(tweet)) {
		return;
	}

	this.tweets.splice(this.tweets.indexOf(tweet), 1);
}

// ----------------------------------------------------------------------------
Topic.prototype.hasTweet = function (tweet) {

	return this.tweets.indexOf(tweet) > -1 ? true : false;
}

// ----------------------------------------------------------------------------
Topic.prototype.setKeyWords = function (keyWords) {
	this.keyWords = keyWords;
}

// ----------------------------------------------------------------------------
Topic.prototype.getKeyWords = function () {
	return this.keyWords;
}

// ----------------------------------------------------------------------------
Topic.prototype.getTitle = function () {
	return this.keyWords.join(' ');
}

// ----------------------------------------------------------------------------
Topic.prototype.addKeyWords = function (keyWords) {
	for (var i = 0; i < keyWords.length; i++) {
		this.addKeyWord(keyWords[i]);
	}
}

// ----------------------------------------------------------------------------
Topic.prototype.addKeyWord = function (keyWord) {
	if (this.hasKeyWord(keyWord)) {
		return;
	}

	this.keyWords.push(keyWord);
}

// ----------------------------------------------------------------------------
Topic.prototype.removeKeyWords = function (keyWords) {
	for (var i = 0; i < keyWords.length; i++) {
		this.removeKeyWord(keyWords[i]);
	}
}

// ----------------------------------------------------------------------------
Topic.prototype.removeKeyWord = function (keyWord) {
	if (!this.hasKeyWord(keyWord)) {
		return;
	}

	this.keyWords.splice(this.keyWords.indexOf(keyWord), 1);
}

// ----------------------------------------------------------------------------
Topic.prototype.hasKeyWord = function (keyWord) {

	return this.keyWords.indexOf(keyWord) > -1 ? true : false;
}

module.exports = Topic;

