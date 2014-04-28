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
 * POST /save/:resourceID
 * save the permalink
 */
exports.saveResource = function(req, res, next){
	var resourceID = parseInt(req.params.resourceID);
	
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
		user.musicCollection.trackSets.list[0].setList.unshift(resourceID);//currently user only has one playlist: 'playlist1'
		user.markModified('musicCollection');//REQUIRED
    user.save(function(err) {
      if (err) return next(err);
			res.send(200);//saved.
    });
	});
};

/**
 * POST /remove/:resourceID
 * remove the permalink
 */
exports.removeResource = function(req, res, next) {
  User.findById(req.user.id, function(err, userObj) {
		if(err) return next(err);
		var resourceID = parseInt(req.params.resourceID);
		var matchIdx = _.indexOf(userObj.musicCollection.trackSets.list[0].setList, resourceID);
		
		if(matchIdx !== -1){//resourceID not found
			userObj.musicCollection.trackSets.list[0].setList = _.pull(userObj.musicCollection.trackSets.list[0].setList, resourceID);
			userObj.markModified('musicCollection');//REQUIRED
		}
		else {//resourceID found
			console.log('> ' +resourceID+ ' not found in this trackSet');
			res.send(404);
		};
		userObj.save(function(err) {
		  if (err) return next(err);
			res.send(200);//resource removed
		});
	});
};