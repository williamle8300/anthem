var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');
var User = require('../models/User');

/**
 * GET /login
 * Login page.
 */

exports.getLogin = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('login.html', {
    app: 'Anthem',
    title: 'Login',
    errors: req.flash('errors')
  });
};

/**
 * GET /signup
 * Signup page.
 */

exports.getSignup = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('signup.html', {
    app: 'Anthem',
    title: 'Sign Up',
    errors: req.flash('errors')
  });
};

/**
 * GET /profile
 * Profile page.
 */

exports.getProfile = function(req, res, next) {
	var username = req.params.username;
  User.findOne({username: username}, function(err, profileUser) {     
    if (!profileUser) return next(err);
    var profileUser = {
      username: profileUser.username,
      _track: profileUser._track,
      _trackSet: profileUser._trackSet,
			profile: profileUser.profile//temp only!
    };
	  res.render('profile/index.html', {
	    app: 'Anthem',
	    title: 'Songs',
	    success: req.flash('success'),
	    error: req.flash('error'),
			profileUser: profileUser
	  });
	});
};

/**
 * GET /settings
 * User settings.
 */

exports.getSettings = function(req, res) {
  res.render('settings.html', {
    app: 'Anthem',
    title: 'Settings',
    success: req.flash('success'),
    error: req.flash('error')
  });
};

/**
 * POST /login
 * Sign in using email and password.
 * @param {string} email
 * @param {string} password
 */

exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/' +user.username);
    });
  })(req, res, next);
};

/**
 * POST /signup
 * Create a new local account.
 * @param {string} email
 * @param {string} password
 */

exports.postSignup = function(req, res, next) {
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        req.flash('errors', { msg: 'User already exists.' });
      }
      return res.redirect('/signup');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      res.redirect('/' +user.username);
    });
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
exports.saveResource = function(req, res){
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
		user.profile.playlists.playlist1.unshift({encodedObjHTML: encodedObjHTML, resourceID: resourceID});//currently user only has one playlist: 'playlist1'
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
exports.removeResource = function(req, res) {
	var removeResourceID = req.params.resourceID;
  User.findById(req.user.id, function(err, user) {                                                             
    if (err) return next(err);          
		for (var i = 0; i < user.profile.playlists.playlist1.length; i++) {
			if (user.profile.playlists.playlist1[i].resourceID == removeResourceID) {
				var matchIndex = i;
			};
		};
		if (matchIndex > -1) {//if exists in playlist1, splice it out
      user.profile.playlists.playlist1.splice(matchIndex, 1);
	    user.save(function(err) {
	      if (err) return next(err);
				res.send(200);//removed.
	    });
	  } else {//else, no match, send 404
	  	res.send(404);
	  }
	});
};