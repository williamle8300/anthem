var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, default: '' },
  password: String,
  tokens: Array,
  provider: String,
  facebook: { type: String, unique: true, sparse: true },
  twitter: { type: String, unique: true, sparse: true },
  google: { type: String, unique: true, sparse: true },
  github: { type: String, unique: true, sparse: true },
	_track: {
		list: [mongoose.Schema.Types.Mixed]
	},
	_trackSet: {
		list: [mongoose.Schema.Types.Mixed],
		lastPlayed: [mongoose.Schema.Types.Mixed],
		lastModified: [mongoose.Schema.Types.Mixed]
	},
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
	}
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);