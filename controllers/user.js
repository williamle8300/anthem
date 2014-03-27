var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');
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
 * POST /save/:resourceID/:encodedObjHTML
 * save the permalink
 */
exports.saveResource = function(req, res, next){
	var resourceID = req.params.resourceID;
	var encodedObjHTML = req.params.encodedObjHTML;
	// var Person = mongoose.model('Person', yourSchema);
  //
	// // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
	// Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
	//   if (err) return handleError(err);
	//   console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
	// })
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
		user._track.list.unshift({encodedObjHTML: encodedObjHTML, resourceID: resourceID});//currently user only has one playlist: 'playlist1'
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
	var removeResourceID = req.params.resourceID;//resourceID
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
		//var matchIDX = user._track.list.indexOf(removeResourceID);
		//console.log(user._track.list);
		//console.log(matchIDX);
		//if (matchIDX !== -1){//exists!
    //  user._track.list.splice(matchIDX, 1);
	  //  user.save(function(err) {
	  //    if (err) return next(err);
		//		res.send(200);//removed.
	  //  });
		//} else {//no exist
		//	console.log(removeResourceID+ ' isn\'t saved by user.')
		//	res.send(404);
		//};
		
		var isMatch = false;
		for (var matchIdx = 0; matchIdx < user._track.list.length; matchIdx++) {//loop over, find, splice it out
			if (user._track.list[matchIdx].resourceID == removeResourceID) {
				isMatch = true;
	      user._track.list.splice(matchIdx, 1);
		    user.save(function(err) {
		      if (err) return next(err);
					res.send(200);//removed.
		    });
			}
		};
		if(isMatch == false){//no match was found
			console.log(removeResourceID+ ' isn\'t saved by user.')
			res.send(404);
		}
	});
};
