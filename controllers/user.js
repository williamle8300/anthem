//'usersProfile' actions

var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');
var _ = require('lodash');

/**
 * GET /:username
 * Profile page.
 */
exports.getProfile = function (req, res, next) {
  var username = req.params.username;

  User.findOne({username: username}, function(err, usersProfile) {
    if (!usersProfile) return next(err);
		var allTrackSets = usersProfile.musicCollection.trackSets.list;
				
		allTrackSets = _.forEach(allTrackSets, function(trackSet) {//!TEMP manually create 'nameChunk' property
			trackSet.nameChunk = trackSet.name.replace(/ /g, '_');
		});
    var usersProfile = {
      username: usersProfile.username,
			allTrackSets: allTrackSets
    };
		
    res.render('profile/profileIndex.html', {
      app: 'Anthem',
      title: 'musicCollection',
			secondTitle: usersProfile.username,
      usersProfile: usersProfile,
      success: req.flash('success'),
      error: req.flash('error')
    });
  });
};

/**
 * GET /:username/:trackSet
 * Profile page.
 */
exports.getTrackSet = function (req, res, next) {

	var username = req.params.username;
	var trackSetIdentifier = req.params.trackSetIdentifier;
	trackSetIdentifier = trackSetIdentifier.replace(/_/g, ' ');//escape spec chars
	User.findOne({username: username}, function(err, usersProfile){
    if (err | !usersProfile){
			console.log('> 404GET /:username/:trackSet. No "username" at: ' +req.url);
			return next(err);
		}

		var userTrackSets = usersProfile.musicCollection.trackSets.list;
		var usersProfile = usersProfile;
		var thisTrackSet = {};
		var setList = [];
		thisTrackSet = _.find(userTrackSets, {'name': trackSetIdentifier});
		if (!thisTrackSet) {//TS not found
			console.log('> 404GET /:username/:trackSet. No "trackSet" at: ' +req.url);
			return next(err);
		};
    usersProfile = {//create the object
      username: usersProfile.username,
    };
    res.render('profile/profileTrackSet.html', {
      app: 'Anthem',
      title: trackSetIdentifier,
			secondTitle: usersProfile.username,
      usersProfile: usersProfile,
			permID: thisTrackSet.permID,
			setList: thisTrackSet.setList,//an array of resourceIDs
      success: req.flash('success'),
      error: req.flash('error')
    });
	});
}

/**
 * POST /postTrackSet/:username/:permID
 * @param {array} setList
 */
exports.postTrackSet = function (req, res, next) {
	var usersUsername = req.params.username;
	var permID = parseInt(req.params.permID);
	var setList = req.body.setList;

  User.findById(req.user.id, function(err, userObj) {
		if (usersUsername === userObj.username) {//actually same user?
			
			var userTrackSets = userObj.musicCollection.trackSets.list;
			var thisTrackSet = {};
			thisTrackSet = _.find(userTrackSets, {'permID': permID});//find TS by permID (LD)
			thisTrackSet.setList = setList;//init new setList
			userObj.markModified('musicCollection');//REQUIRED!
			userObj.save(function(err) {
			  if (err) return next(err);
				res.send(200);//resource removed
			});
		}
	});
}

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
// * POST /pushToTrackSet/:username/:permID/:resourceID
// * save to a trackSet
// */
//exports.saveResource = function(req, res, next){
//  User.findById(req.user.id, function(err, userObj) {
//		var resourceID = parseInt(req.params.resourceID);
//		var permID = req.params.permID;
//		var userTrackSets = userObj.musicCollection.trackSets.list;
//		var thisTrackSet = {};
//
//    if (err) return next(err);
//		thisTrackSet = _.find(userTrackSets, {'name': permID});
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
// * POST /pullFromTrackSet/:username/:permID/:resourceID
// * remove from a trackSet
// */
//exports.removeResource = function(req, res, next) {
//  User.findById(req.user.id, function(err, userObj) {
//		if(err) return next(err);
//		var resourceID = parseInt(req.params.resourceID);
//		var permID = req.params.permID;
//		var userTrackSets = userObj.musicCollection.trackSets.list;
//		var thisTrackSet = {};
//
//		thisTrackSet = _.find(userTrackSets, {'name': permID});
//		if (!thisTrackSet) {//trackSet not found
//			console.log('> 404POST remove/:resourceID/:permID. No "trackSet" at: ' +req.url);
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