// Tweet object

var Natural = require('natural'),
  steemer = Natural.PorterStemmerFr,
	metaphone = Natural.Metaphone;

var fs = require("fs");

metaphone.attach();

var uselessWords = JSON.parse(fs.readFileSync('./config/uselessWords_fr.json', encoding="ascii"));

// ----------------------------------------------------------------------------
function Tweet(opts) {
	if (!opts) {
		opts = {};
	}

	this.id;

	this.userName;
	this.userScreenName;
	this.userImageUrl;
	this.text;
	this.createdAt;
	this.retweetCount;
	this.favoriteCount;
	this.stemmedWords;
	// this.init(opts);
}

// ----------------------------------------------------------------------------
Tweet.prototype.init = function(opts) {
	this.id = opts.id;

	this.userName = opts.user.name;
	this.userScreenName = opts.user.screen_name;	
	this.userImageUrl = opts.user.profile_image_url;
	this.text = opts.text;
	this.createdAt = opts.created_at;
	this.retweetCount = opts.retweet_count;
	this.favoriteCount = opts.favorite_count;

	this.computeSteemedWords();
}

// ----------------------------------------------------------------------------
Tweet.prototype.setId = function(id) {
	this.id = id;
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getId = function () {
	return this.id;
}

// ----------------------------------------------------------------------------
Tweet.prototype.setUserName = function (text) {
	this.userName = text
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getUserName = function () {
	return this.userName;
}

// ----------------------------------------------------------------------------
Tweet.prototype.setUserScreenName = function (text) {
	this.userScreenName = text
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getUserScreenName = function () {
	return this.userScreenName;
}


// ----------------------------------------------------------------------------
Tweet.prototype.setUserImageUrl= function (text) {
	this.userImageUrl= text
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getUserImageUrl= function () {
	return this.userImageUrl;
}


// ----------------------------------------------------------------------------
Tweet.prototype.setText = function (text) {
	this.text = text
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getText = function () {
	var text = addlinks(this.text);
	return this.text;
}

// ----------------------------------------------------------------------------
Tweet.prototype.setCreatedAt = function (date) {
	this.createdAt = date
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getCreatedAt = function () {
	return this.createdAt;
}

// ----------------------------------------------------------------------------
Tweet.prototype.setRetweetCount = function (count) {
	this.retweetCount = count
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getRetweetCount = function () {
	return this.retweetCount;
}

// ----------------------------------------------------------------------------
Tweet.prototype.setFavoriteCount = function (count) {
	this.favoriteCount = count
	return this;
}

// ----------------------------------------------------------------------------
Tweet.prototype.getFavoriteCount = function () {
	return this.favoriteCount;
}


// ----------------------------------------------------------------------------
Tweet.prototype.computeSteemedWords = function() {
	if (!this.text) {
		return;
	}

	var text = linkify(this.text);
	var words = steemer.tokenizeAndStem(text);

	this.stemmedWords = {};
	for (var i = 0; i < words.length; i++)
	{
		if (words[i].length <= 3 || uselessWords.hasOwnProperty(words[i])) {
			continue;
		}

		// var stemmedWord = words[i].phonetics();
		var stemmedWord = words[i];

		console.log (words[i] + " --> " + stemmedWord);

		if (stemmedWord in this.stemmedWords)
		{
		this.stemmedWords[stemmedWord] ++;
		}
		else
		{
		this.stemmedWords[stemmedWord] = 1;
		}
	}

}

// ----------------------------------------------------------------------------
Tweet.prototype.getStemmedWords = function() {
	return this.stemmedWords;
}

// ----------------------------------------------------------------------------
Tweet.prototype.setStemmedWords = function(stemmedWords) {
	this.stemmedWords = stemmedWords;
	return this;
}

function linkify(text) {
	var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(urlRegex, '' );
}

module.exports = Tweet;

