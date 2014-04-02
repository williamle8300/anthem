var mongoose = require('mongoose');

var apiCache = new mongoose.Schema({
	resourceID: {type: Number, unique: true}
//	encodedHTMLObj: {type: String, default: ''}
});

module.exports = mongoose.model('apiCache', apiCache);