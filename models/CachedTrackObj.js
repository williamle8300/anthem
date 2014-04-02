var mongoose = require('mongoose');

var cachedTrackObj = new mongoose.Schema({
	resourceID: {type: Number, unique: true},
	encodedObjHTML: {type: String, required: true}
});

module.exports = mongoose.model('cachedTrackObj', cachedTrackObj);