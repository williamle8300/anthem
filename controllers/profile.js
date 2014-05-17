//'usersProfile' actions

var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');
var _ = require('lodash');

/**
 * GET /:username
 * Profile page.
 */
exports.getProfile = function (req, res, next) {
  var username = req.params.username;

  User.findOne({username: username}, function(err, usersProfile) {
    if (!usersProfile) return next(err);
		var allTrackSets = usersProfile.musicCollection.trackSets.list;
				
		allTrackSets = _.forEach(allTrackSets, function(trackSet) {//!TEMP manually create 'nameChunk' property
			trackSet.nameChunk = trackSet.name.replace(/ /g, '_');
		});
    var usersProfile = {
      username: usersProfile.username,
			allTrackSets: allTrackSets
    };
		
    res.render('profile/profileIndex.html', {
      app: 'Anthem',
      title: 'Songs',
      usersProfile: usersProfile,
      success: req.flash('success'),
      error: req.flash('error')
    });
  });
};

/**
 * GET /:username/:trackSet
 * Profile page.
 */
exports.getTrackSet = function (req, res, next) {
	var username = req.params.username;
	var trackSetName = req.params.trackSet;
	
	trackSetName = trackSetName.replace(/_/g, ' ');//escape spec chars
	User.findOne({username: username}, function(err, usersProfile){
    if (err | !usersProfile){
			console.log('> 404GET /:username/:trackSet. No "username" at: ' +req.url);
			return next(err);
		}
		var userTrackSets = usersProfile.musicCollection.trackSets.list;
		var usersProfile = usersProfile;
		var thisTrackSet = {};
		var setList = [];
 
		thisTrackSet = _.find(userTrackSets, {'name': trackSetName});
		if (!thisTrackSet) {//trackSetName not found
			console.log('> 404GET /:username/:trackSet. No "trackSet" at: ' +req.url);
			return next(err);
		};
    usersProfile = {//create the object
      username: usersProfile.username,
			setList: thisTrackSet.setList//an array of resourceIDs
    };
    res.render('profile/profileTrackSet.html', {
      app: 'Anthem',
      title: trackSetName,
      usersProfile: usersProfile,
      success: req.flash('success'),
      error: req.flash('error')
    });
	});
}