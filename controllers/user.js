
var
 mongoose = require('mongoose'),
 passport = require('passport'),
 User = require('../models/User'),
 _ = require('lodash');

/**
 * GET /:username
 * Profile page.
 */
exports.getProfile = function (req, res, next) {

  var username = req.params.username;

  User.findOne({username: username}, function(err, userObj) {
    if (!userObj) return next(err);
		
		var allTrackSets = userObj.musicCollection.trackSets.list;
				
		//!TEMP manually create 'nameChunk' property
		allTrackSets = _.forEach(allTrackSets, function(trackSet) {
			trackSet.nameChunk = trackSet.name.replace(/ /g, '_');
		});
		
    var usersProfile = {
      username: userObj.username,
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
 * TrackSet page
 */
exports.getTrackSet = function (req, res, next) {

	var
	 username = req.params.username,
	 trackSetIdentifier = req.params.trackSetIdentifier.replace(/_/g, ' ');//escape spec chars
		
		User.findOne({username: username}, function(err, userObj){
    if (err | !userObj){
			console.log('> 404GET /:username/:trackSet. No "username" at: ' +req.url);
			return next(err);
		}

		var
		 usersProfile = {username: userObj.username},
		 userTrackSets = userObj.musicCollection.trackSets.list,
		 thisTrackSet = thisTrackSet = _.find(userTrackSets, {'name': trackSetIdentifier}),
		 setList = [];

		//no trackSet at req.url
		if (!thisTrackSet) {
			console.log('> 404GET /:username/:trackSet. No "trackSet" at: ' +req.url);
			return next(err);
		};

    res.render('profile/profileTrackSet.html', {
      app: 'Anthem',
      title: trackSetIdentifier,
			secondTitle: usersProfile.username,
      usersProfile: usersProfile,
			permID: thisTrackSet.permID,
			setList: thisTrackSet.setList,
      success: req.flash('success'),
      error: req.flash('error')
    });
	});
}

/**
 * POST /postTrackSet/:permID
 * @param {array} setList
 * 
 * Can be used to POST new/existing trackSets
 */
exports.postTrackSet = function (req, res, next) {
	
	var
	 permID = parseInt(req.params.permID),
	 setList = req.body.setList;

  User.findById(req.user.id, function(err, userObj) {			

			var
			 userTrackSets = userObj.musicCollection.trackSets.list,
			 thisTrackSet = {};

			//find trackSet by permID
			thisTrackSet = _.find(userTrackSets, {'permID': permID});
			thisTrackSet.setList = setList;//store new setList

			//Save changes
			userObj.markModified('musicCollection');
			userObj.save(function(err) {
			  if (err) return next(err);
				res.send(200);//resource removed
			});

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