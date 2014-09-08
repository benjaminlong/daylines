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

	var dataset_0 = JSON.parse(fs.readFileSync('./config/dataset_0.json', encoding="ascii"));
	var dataset_1 = JSON.parse(fs.readFileSync('./config/dataset_1.json', encoding="ascii"));
	var dataset_2 = JSON.parse(fs.readFileSync('./config/dataset_2.json', encoding="ascii"));
	var dataset_3 = JSON.parse(fs.readFileSync('./config/dataset_3.json', encoding="ascii"));

	var dataset = [];
	dataset = dataset.concat(dataset_0);
	dataset = dataset.concat(dataset_1);
	dataset = dataset.concat(dataset_2);
	dataset = dataset.concat(dataset_3);

	// --------------------------------------------------------------------------
	it('** TOTO a la plage **', function () {
		keyWords.computeKeyWordsFromTweets(dataset);
		var currentkeyWords = keyWords.getKeyWords();

		// for (var key in currentkeyWords) {
		// 	console.log(key);
		// 	console.log(currentkeyWords[key]['value']);
		// 	console.log(currentkeyWords[key]['tweets']);
		// }

		var merged = keyWords.mergeKeyWords();

        var topics = keyWords.createTopics(merged);

        console.log(topics);

	});
});
