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
    var usersProfile = {
      username: usersProfile.username,
      _track: usersProfile._track,
      _trackSet: usersProfile._trackSet,
      //profile: usersProfile.profile
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
	var trackSet = req.params.trackSet;
	trackSet === "null" ? trackSet = null : trackSet = trackSet;//is the trackSet called NULL?

	User.findOne({username: username}, function(err, usersProfile){
    if (err) return next(err);
		var userTrackSetList = usersProfile.musicCollection.trackSets.list;
		var usersProfile = usersProfile;
		var thisTrackSet = {};
		var setList = [];

		if(!usersProfile) {//username aint exist
			console.log('> accidental GET request for a trackSet! ' +req.url);
			res.end();
		} else {//found the username
			thisTrackSet = _.find(userTrackSetList, {'name': trackSet});//lookup the particular trackSet
	    usersProfile = {//create the object
	      username: usersProfile.username,
				setList: thisTrackSet.setList//an array of resourceIDs
	    };
	    res.render('profile/profileTrackSet.html', {
	      app: 'Anthem',
	      title: trackSet,
	      usersProfile: usersProfile,
	      success: req.flash('success'),
	      error: req.flash('error')
	    });
		}
	});
}