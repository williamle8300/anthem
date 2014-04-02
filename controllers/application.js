var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');
var cachedTrackObj = require('../models/CachedTrackObj');
var User = require('../models/User');

/**
 * GET
 * for routes: '/', '/search'
 */
exports.search = function(req, res){
	res.render('layouts/general.html', {app: 'Anthem', title: 'Search', view: 'Search'});
}

/**
 * POST
 * Gets value from searchbox
 * @param {string} query
 */
exports.postSearch = function(req, res){
	var query = encodeURIComponent(req.body.query); //`query` is `name` attr of <input/>
	console.log('\n ...Searching "' +query+ '"\n ');
	res.location('search/' +query);
	res.redirect('search/' +query)
};

/**
 * GET /search/:query
 * Runs phantomFunctions and displays search results to user
 * @param {function} phantomSoundCloud
 * @param {string} query
 */
//212b7a5080f5d7f8e831583446771a02
exports.getSearchResults = function(phantomSoundCloud) {//have to flip the function because passing in another module (e.g., phantomSoundCloud)
	return function(req, res){
		var query = req.params.query;//from url: "/search/{query}"
		phantomSoundCloud(query, function handlePhantomResults(phantomResults){
			if(phantomResults.trackSet == 0){
				console.log('\n Found [0] tracks\n');
				res.render('404.html', {app: 'Anthem', title: '404', query: query});
			}
			else{
				console.log('\n Found [' +phantomResults.trackSet.length+ '] tracks\n');
				res.render('search/searchIndex.html', {app: 'Anthem', title: 'Results for "' +query+ '"', query: query, trackSet: phantomResults.trackSet});
			}
		});
	};
};

//GET
//store some test tracks
//test retrieval
//POST
// ... 
//prevent dups

/**
 * GET /getIDEOH/:resourceID
 * Uses `resourceID` to check whether document exists in db
 * IF exists, it returns an object {`resourceID``encodedObjHTML`}
 * ELSE, returns the `false` bool
 */
exports.getCachedTrackObj = function (req, res) {
//  var newTrack = new cachedTrackObj({
//    resourceID: req.params.resourceID,
//		encodedObjHTML: req.params.encodedObjHTML
//  });
//  newTrack.save(function(err) {
//    if (err) {
//      if (err.code === 11000) {//MongoDB code for "duplicate _id exists in collection"
//        req.flash('errors', { msg: 'Track already exists.' });
//      }
//      return res.redirect('/');
//    }
//	  cachedTrackObj.find({}, function(err, results) {//log the whole collection
//			console.log(results);
//	 		res.send(200);
//		});
//  });
}

exports.postCachedTrackObj = function (req, res) {
  var newTrack = new cachedTrackObj({
    resourceID: req.params.resourceID,
		encodedObjHTML: req.params.encodedObjHTML
  });
  newTrack.save(function(err) {
    if (err) {
      if (err.code === 11000) {//MongoDB code for "duplicate _id exists in collection"
        req.flash('errors', { msg: 'Track already exists.' });
      }
      return res.redirect('/');
    }
	  cachedTrackObj.find({}, function(err, results) {//log the whole collection
			console.log(results);
	 		//res.send(200);
		});
  });	
}