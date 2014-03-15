
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
var phantomSoundCloud = require('phantomFunctions').phantomSoundCloud;
//var phantomRedditRMusic = require('phantomFunctions').phantomRedditRMusic;
//var phantomYouTube = require('phantomFunctions').phantomYouTube;

/**
 * Load controllers.
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');

/**
 * API keys + Passport configuration.
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {res.status(404).render('404.html', { status: 404 }); });
app.use(express.errorHandler());


/**
 * Application routes.
 */
//Home
app.get('/', homeController.search);//same
app.get('/search', homeController.search);//same
app.get('/search/:query', homeController.getSearchResults(phantomSoundCloud));
app.post('/postSearch', homeController.postSearch); //handles 'query' in searchbox
//UserSettings
app.get('/settings', passportConf.isAuthenticated, userController.getSettings);
app.post('/settings/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/settings/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/settings/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/settings/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
//LoginandSignUps
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
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
//ContactUsPage
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
//API
app.get('/api', apiController.getApi);
app.get('/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
app.get('/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
app.get('/api/facebook', passportConf.isAuthenticated, apiController.getFacebook);
app.get('/api/scraping', apiController.getScraping);
app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);
app.get('/api/lastfm', apiController.getLastfm);
app.get('/api/nyt', apiController.getNewYorkTimes);
app.get('/api/twitter', passportConf.isAuthenticated, apiController.getTwitter);
app.get('/api/aviary', apiController.getAviary);
//Profile (must be listed last)
app.get('/:username', passportConf.isAuthenticated, userController.getProfile);
app.post('/save/:resourceID/:encodedObjHTML', passportConf.isAuthenticated, userController.saveResource)
app.post('/remove/:resourceID', passportConf.isAuthenticated, userController.removeResource)

//Start-up the app!
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
