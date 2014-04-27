//'user' actions

var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');
var User = require('../models/User');
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
	// });
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
		//var userTrackSetList = userObj.musicCollection.trackSets.list[0];//TEMP. right now only save/remove from NULL
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
  User.findById(req.user.id, function(err, user) {
		if(err) return next(err);
		var resourceID = parseInt(req.params.resourceID);
		var matchIdx = _.indexOf(user.musicCollection.trackSets.list[0].setList, resourceID);
		
		if(matchIdx === -1){//resourceID not found
			console.log('nada...');
			res.send(404);
		} else {//resourceID found
			_.pull(user.musicCollection.trackSets.list[0].setList, resourceID);
			user.save(function(err) {
			  if (err) return next(err);
				console.log(user.musicCollection.trackSets.list[0].setList);
				res.send(200);//resource removed
			});
		};
		
	});
};

//exports.removeResource = function(req, res, next) {
//  User.findById(req.user.id, function(err, user) {
//		var removeResourceID = req.params.resourceID;
//		var trackslist = user._track.list;
//		var matchIdx = -1;
//
//    if (err) return next(err);
//		matchIdx = _.findIndex(trackslist, {'resourceID' : removeResourceID});//lodash magique.
//		if (matchIdx === -1) {
//			console.log(removeResourceID + ' isn\'t saved by user.');
//			res.send(404);
//		} else {
//			trackslist.splice(matchIdx, 1);
//		};
//    user.save(function(err) {
//      if (err) return next(err);
//			res.send(200);//resource removed
//    });
//	});
//};