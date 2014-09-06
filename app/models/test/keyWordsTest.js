/**
* Created by benjaminlong on 9/4/14.
*/
var fs = require("fs");
var should = require('chai').should;
var expect = require('chai').expect;
var KeyWords = require('../keyWords');
var Tweet = require('../tweet');

// ----------------------------------------------------------------------------
describe('--------- keyWords ---------', function () {
	var keyWords = new KeyWords();
	keyWords.setFilterValue(10);

	var dataset = JSON.parse(fs.readFileSync('./config/dataset_0.json', encoding="ascii"));

	// --------------------------------------------------------------------------
	it('** TOTO a la plage **', function () {
		keyWords.computeKeyWordsFromTweets(dataset);
		var currentkeyWords = keyWords.getKeyWords();

		for (var key in currentkeyWords) {
			console.log(key);
			console.log(currentkeyWords[key]['value']);
			console.log(currentkeyWords[key]['tweets']);
		}
	});
});
