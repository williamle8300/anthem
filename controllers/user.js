//'user' actions

var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');
var User = require('../models/User');

/**
 * GET /settings
 * User settings.
 */

exports.getSettings = function(req, res) {
  res.render('user/settings.html', {
    app: 'Anthem',
    title: 'Settings',
    success: req.flash('success'),
    error: req.flash('error')
  });
};

/**
 * POST /settings/profile
 * Update profile information.
 */
exports.postUpdateProfile = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.email = req.body.email || '';
    user.username = req.body.username || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.website = req.body.website || '';

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Profile information updated.');
      res.redirect('/settings');
    });
  });
};

/**
 * POST /settings/password
 * Update current password.
 * @param {string} password
 */

exports.postUpdatePassword = function(req, res, next) {
  if (!req.body.password) {
    req.flash('error', 'Password cannot be blank.');
    return res.redirect('/settings');
  }

  if (req.body.password !== req.body.confirmPassword) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect('/settings');
  }

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.password = req.body.password;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Password has been changed.');
      res.redirect('/settings');
    });
  });
};

/**
 * POST /settings/delete
 * Delete user account.
 * @param {string} id
 */

exports.postDeleteAccount = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    if (err) return next(err);
    req.logout();
    res.redirect('/');
  });
};

/**
 * GET /settings/unlink/:provider
 * Unlink OAuth2 provider from the current user.
 * @param {string} provider
 * @param {string} id
 */

exports.getOauthUnlink = function(req, res, next) {
  var provider = req.params.provider;
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user[provider] = undefined;
    user.tokens = _.reject(user.tokens, function(token) { return token.kind === provider; });

    user.save(function(err) {
      if (err) return next(err);
      res.redirect('/settings');
    });
  });
};

/**
 * GET /logout
 * Log out.
 */

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * POST /set/:resourceID
 * Set to theTrackSet
 */
exports.setResource = function(req, res, next){
  User.findById(req.user.id, function(err, userObj) {
		var resourceID = parseInt(req.params.resourceID);
		var theTrackSet = userObj.musicCollection.trackSets.list[0].setList;

    if (err) return next(err);
		theTrackSet.unshift(resourceID);
		userObj.markModified('musicCollection');//REQUIRED
    userObj.save(function(err) {
      if (err) return next(err);
			res.send(200);//saved.
    });
	});
};

/**
 * POST /deset/:resourceID
 * Deset from theTrackSet
 */
exports.desetResource = function(req, res, next) {
  User.findById(req.user.id, function(err, userObj) {
		if(err) return next(err);
		var resourceID = parseInt(req.params.resourceID);
		var theTrackSet = userObj.musicCollection.trackSets.list[0].setList;
		
		theTrackSet = _.pull(theTrackSet, resourceID);
		userObj.markModified('musicCollection');//REQUIRED!
		userObj.save(function(err) {
		  if (err) return next(err);
			res.send(200);//resource removed
		});
	});
};

///**
// * POST /save/:resourceID/:trackSet
// * save to a trackSet
// */
//exports.saveResource = function(req, res, next){
//  User.findById(req.user.id, function(err, userObj) {
//		var resourceID = parseInt(req.params.resourceID);
//		var trackSet = req.params.trackSet;
//		var userTrackSets = userObj.musicCollection.trackSets.list;
//		var thisTrackSet = {};
//
//    if (err) return next(err);
//		thisTrackSet = _.find(userTrackSets, {'name': trackSet});
//		thisTrackSet.setList.unshift(resourceID);
//		userObj.markModified('musicCollection');//REQUIRED
//    userObj.save(function(err) {
//      if (err) return next(err);
//			res.send(200);//saved.
//    });
//	});
//};
//
///**
// * POST /remove/:resourceID/:trackSet
// * remove from a trackSet
// */
//exports.removeResource = function(req, res, next) {
//  User.findById(req.user.id, function(err, userObj) {
//		if(err) return next(err);
//		var resourceID = parseInt(req.params.resourceID);
//		var trackSet = req.params.trackSet;
//		var userTrackSets = userObj.musicCollection.trackSets.list;
//		var thisTrackSet = {};
//
//		thisTrackSet = _.find(userTrackSets, {'name': trackSet});
//		if (!thisTrackSet) {//trackSet not found
//			console.log('> 404POST remove/:resourceID/:trackSet. No "trackSet" at: ' +req.url);
//			return next(err);
//		};
//		
//		thisTrackSet.setList = _.pull(thisTrackSet.setList, resourceID);
//		userObj.markModified('musicCollection');//REQUIRED!
//		userObj.save(function(err) {
//		  if (err) return next(err);
//			res.send(200);//resource removed
//		});
//	});
//};


/**
 * GET /:username/sort/:permID
 * req.body.setList!!!
 * Profile page.
 */
exports.postTrackSet = function (req, res, next) {

	var usersUsername = req.params.username;
	var permID = parseInt(req.params.permID);
	var newSetList = req.body.setList;
  User.findById(req.user.id, function(err, userObj) {
		if (usersUsername === userObj.username) {//actually same user?
			
			var userTrackSets = userObj.musicCollection.trackSets.list;
			var thisTrackSet = {};
			thisTrackSet = _.find(userTrackSets, {'permID': permID});//find TS by permID (LD)
			thisTrackSet.setList = newSetList;//init new setList
			userObj.markModified('musicCollection');//REQUIRED!
			userObj.save(function(err) {
			  if (err) return next(err);
				res.send(200);//resource removed
			});
		}
	});
}