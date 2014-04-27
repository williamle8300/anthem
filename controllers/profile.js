//'usersProfile' actions

var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');
var _ = require('lodash');

/**
 * GET /profile
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

exports.getTrackSet = function (req, res, next) {
	var username = req.params.username;
	var trackSet = req.params.trackSet;

	User.findOne({username: username}, function(err, usersProfile){
		var userTrackSetList = usersProfile.musicCollection.trackSets.list;
		var usersProfile = usersProfile;
		var setList = [];

		if(!usersProfile) {//username doesn't exists... just end the request
			console.log('> accidental GET request for a trackSet! ' +req.url);
			res.end();
		} else {//found a user
			console.log(req.url);//ONLY TEMP. tracking a bug down...
			setList = _.find(userTrackSetList, {'name': trackSet}).setList;//lookup partic trackSet
	    usersProfile = {//ready usersProfile
	      username: usersProfile.username,
				setList: setList
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