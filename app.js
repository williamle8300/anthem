
/**
 * Module dependencies.
 */
var express = require('express');
var flash = require('connect-flash');
var less = require('less-middleware');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var nunjucks = require('nunjucks');
var phantomSoundCloud = require('./lib/phantomFunctions').phantomSoundCloud;
//var phantomRedditRMusic = require('phantomFunctions').phantomRedditRMusic;
//var phantomYouTube = require('phantomFunctions').phantomYouTube;

/**
 * Load controllers.
 */
var applicationController = require('./controllers/application');
var accountsController = require('./controllers/accounts');
var userController = require('./controllers/user');
var profileController = require('./controllers/profile');

/**
 * API keys & Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Mongoose configuration.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('-MongoDB Connection Error-');
});

var app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {autoescape: true, express: app});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret code' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) { res.locals.user = req.user; next(); });
app.use(flash());
app.use(less({ src: __dirname + '/public', compress: true }));
app.use(app.router);
app.use(express.static(path.join(__dirname, '')));//removed 'public'
app.use('/public', express.static(__dirname + '/public'));
app.use(function(req, res) {res.status(404).render('404.html', { status: 404 }); });
app.use(express.errorHandler());

/**
 * Application routes.
 */
//Home 
app.get('/', passportConf.isAuthenticated, applicationController.search);//same
app.get('/search', passportConf.isAuthenticated, applicationController.search);//same
app.get('/search/:query', passportConf.isAuthenticated, applicationController.getSearchResults(phantomSoundCloud));
app.post('/postSearch', passportConf.isAuthenticated, applicationController.postSearch); //handles 'query' in searchbox
app.get('/getCachedTrackObj/:resourceID', applicationController.getCachedTrackObj);
app.post('/postCachedTrackObj/:resourceID/:encodedObjHTML', applicationController.postCachedTrackObj);
app.get('/login', accountsController.getLogin);
app.post('/login', accountsController.postLogin);
app.get('/signup', accountsController.getSignup);
app.post('/signup', accountsController.postSignup);
//LoginViaOAuth2
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }));
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) { res.redirect('/api/foursquare'); });
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) { res.redirect('/api/tumblr'); });
//User
app.post('/save/:resourceID', passportConf.isAuthenticated, userController.saveResource);
app.post('/remove/:resourceID', passportConf.isAuthenticated, userController.removeResource);
app.get('/settings', passportConf.isAuthenticated, userController.getSettings);
app.post('/settings/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/settings/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/settings/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/settings/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
app.get('/logout', passportConf.isAuthenticated, userController.logout);
//Profile (must list these last)
app.get('/:username', passportConf.isAuthenticated, profileController.getProfile);
app.get('/:username/:trackSet', passportConf.isAuthenticated, profileController.getTrackSet);

//Start-up the app!
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
