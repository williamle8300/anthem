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
	res.render('layouts/general.html', {app: 'Anthem', title: 'Search', secondTitle: 'Search', view: 'Search'});
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
				res.render('search/searchIndex.html', {app: 'Anthem', title: 'Results for "' +query+ '"', secondTitle: 'Search', query: query, trackSet: phantomResults.trackSet});
			}
		});
	};
};

/**
 * GET /postCachedTrackObj/:resourceID
 * Returns results after runnig resourceID against db
 */
exports.getCachedTrackObj = function (req, res, next) {
	var resourceID = req.params.resourceID;

  cachedTrackObj.findOne({resourceID: resourceID}, function(err, cachedTrackObj) {//log the whole collection
		if (err) return next(err);
		res.send(cachedTrackObj);//send to $.ajax's success func; if nothing found in db, sends back blank string
	});
}

/**
 * POST /postCachedTrackObj/:resourceID/:encodedObjHTML
 * Stores into db; schema prevents duplicate docs
 */
exports.postCachedTrackObj = function (req, res, next) {
  var newTrack = new cachedTrackObj({//create new object for mongodb
    resourceID: req.params.resourceID,
		encodedObjHTML: req.params.encodedObjHTML
  });
	
  newTrack.save(function(err) {
    if (err) {
      if (err.code === 11000) {//mongodb "duplicate" err.code
        console.log(newTrack.resourceID + ' already exists in cachedTrackObj collection.');
				cachedTrackObj.findOne({resourceID: parseInt(req.params.resourceID)}, function (err, track) {//remove ALL dups. prob should switch to 'findOne'
					//if (err) {return next(err)}//!TEMP prob needs error checking here
				  track.encodedObjHTML = req.params.encodedObjHTML;
				  track.save();
				})
      }
      return res.redirect('/');
    }
 		res.send(200);
  });	
}