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
  User.findOne({username: username}, function(err, userObj) {
    if (!userObj) return next(err);
    var userObj = {
      username: userObj.username,
      _track: userObj._track,
      _trackSet: userObj._trackSet,
      //profile: userObj.profile
    };
    res.render('profile/profileIndex.html', {
      app: 'Anthem',
      title: 'Songs',
      userObj: userObj,
      success: req.flash('success'),
      error: req.flash('error')
    });
  });
};

exports.getTrackSet = function (req, res, next) {
	var username = req.params.username;
	var trackSet = req.params.trackSet;

	User.findOne({username: username}, function(err, userObj){
		var userTrackSetList = userObj.musicCollection.trackSets.list;
		var userObj = userObj;
		var setList = [];

		if(!userObj) {//username doesn't exists... just end the request
			console.log('> accidental GET request for a trackSet! ' +req.url);
			res.end();
		} else {
			setList = _.find(userTrackSetList, {'name': trackSet}).setList;
			console.log(setList);
	    userObj = {
	      username: userObj.username,
				setList: setList
	    };
	    res.render('profile/profileTrackSet.html', {
	      app: 'Anthem',
	      title: trackSet,
	      userObj: userObj,
	      success: req.flash('success'),
	      error: req.flash('error')
	    });
		}
	});
}