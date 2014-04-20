var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');

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
	var trackSet = req.params.trackSet;
	
	User.findOne({username: username}, function(err, userObj){
		if(!userObj) {//username doesn't exists... just end the request
			console.log('> accidental GET request for a trackSet!');
			res.end();
		}
		else {//username exists
			console.log(userObj.musicCollection.trackSets.list[0].setList);//log the 'staging' trackSet
			//get 'username's 'trackSets.list'
			//use the params to return the correct trackSet in 'list'
			res.end();
		}
	});
}