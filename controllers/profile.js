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
      //profile: profileUser.profile//not needed yet
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
