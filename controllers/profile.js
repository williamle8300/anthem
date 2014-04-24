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
  User.findOne({username: username}, function(err, profileUser) {
    if (!profileUser) return next(err);
    var profileUser = {
      username: profileUser.username,
      _track: profileUser._track,
      _trackSet: profileUser._trackSet,
      //profile: profileUser.profile
    };
    res.render('profile/profileIndex.html', {
      app: 'Anthem',
      title: 'Songs',
      success: req.flash('success'),
      error: req.flash('error'),
      profileUser: profileUser
    });
  });
};

exports.getTrackSet = function (req, res, next) {
	var username = req.params.username;
	var trackSetName = req.params.trackSet;

	User.findOne({username: username}, function(err, userObj){
		var userTrackSetList = userObj.musicCollection.trackSets.list

		if(!userObj) {//username doesn't exists... just end the request
			console.log('> accidental GET request for a trackSet! ' +req.url);
			res.end();
		} else {
			console.log(_.find(userTrackSetList, {'name': trackSetName}));
			//RENDER with the trackSet array
			res.end();
		}
	});
}