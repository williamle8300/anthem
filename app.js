
//Module dependencies
var express = require('express');
var flash = require('connect-flash');
var less = require('less-middleware');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var nunjucks = require('nunjucks');
var phantomSoundCloud = require('./lib/phantomFunctions').phantomSoundCloud;

//Load controllers
var applicationController = require('./controllers/application');
var accountsController = require('./controllers/accounts');
var userController = require('./controllers/user');

//API keys & Passport configuration
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

//Mongoose configuration
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {console.log('-MongoDB Connection Error-')});

var app = express();//app instance

//Express configuration
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

//Application
app.get('/', passportConf.isAuthenticated, applicationController.search);
app.get('/search', passportConf.isAuthenticated, applicationController.search);
app.get('/search/:query', passportConf.isAuthenticated, applicationController.getSearchResults(phantomSoundCloud));
app.post('/postSearch', passportConf.isAuthenticated, applicationController.postSearch); //handles 'query' in #searchbox
app.get('/getCachedTrackObj/:resourceID', applicationController.getCachedTrackObj);
app.post('/postCachedTrackObj/:resourceID/:encodedObjHTML', applicationController.postCachedTrackObj);

//Accounts
app.get('/login', accountsController.getLogin);
app.post('/login', accountsController.postLogin);
app.get('/signup', accountsController.getSignup);
app.post('/signup', accountsController.postSignup);
app.get('/settings', passportConf.isAuthenticated, accountsController.getSettings);
app.post('/settings/profile', passportConf.isAuthenticated, accountsController.postUpdateProfile);
app.post('/settings/password', passportConf.isAuthenticated, accountsController.postUpdatePassword);
app.post('/settings/delete', passportConf.isAuthenticated, accountsController.postDeleteAccount);
app.get('/settings/unlink/:provider', passportConf.isAuthenticated, accountsController.getOauthUnlink);
app.get('/logout', passportConf.isAuthenticated, accountsController.logout);

//User (POST) //The order of these routings aren't arbitrary. Important!
app.post('/set/:resourceID', passportConf.isAuthenticated, userController.setResource);
app.post('/deset/:resourceID', passportConf.isAuthenticated, userController.desetResource);
app.post('/postTrackSet/:username/:permID', passportConf.isAuthenticated, userController.postTrackSet);

//User (GET)
app.get('/:username', passportConf.isAuthenticated, userController.getProfile);
app.get('/:username/:trackSetIdentifier', passportConf.isAuthenticated, userController.getTrackSet);

//Start-up the app
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
