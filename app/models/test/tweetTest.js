/**
* Created by benjaminlong on 9/4/14.
*/
var fs = require("fs");
var should = require('chai').should;
var expect = require('chai').expect;
var Tweet = require('../tweet');

// ----------------------------------------------------------------------------
describe('#tweet', function () {
	var tweet = new Tweet();

	// --------------------------------------------------------------------------
	it('** setter getter **', function () {
		tweet.setText("It is Toto");
		expect(tweet.getText()).equal('It is Toto');
	});

	// --------------------------------------------------------------------------
	it('** stemmed words **', function () {
		tweet.setText('agreablement agreable akreabl toujours tjours tjr');

		tweet.computeSteemedWords();

		expect(tweet.getStemmedWords()).to.eql({'AKRBL' : 3, 'TJR' : 2 });
	});

	var dataTest = JSON.parse(fs.readFileSync('./config/exemple.json', encoding="ascii"));

	// --------------------------------------------------------------------------
	it('** init tweet **', function () {
		tweet.init(dataTest);

		expect(tweet.getId()).equal(502935421009924100);
		expect(tweet.getText()).equal(
			'Un policier jugé pour cannibalisme en Allemagne http://t.co/Y55M9ZkpNj');
		expect(tweet.getCreatedAt()).equal('Fri Aug 22 21:48:43 +0000 2014');
		expect(tweet.getFavoriteCount()).equal(0);
		expect(tweet.getRetweetCount()).equal(3);

		expect(tweet.getStemmedWords()).to.eql(
			{"ALMN": 1, "KNBL": 1, "PLS": 1});

	});

});
