
/*
** old controllers on app.js
*/

//var apiController = require('./controllers/api');
//var contactController = require('./controllers/contact');

//ContactUsPage
//app.get('/contact', contactController.getContact);
//app.post('/contact', contactController.postContact);
//API
//app.get('/api', apiController.getApi);
//app.get('/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
//app.get('/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
//app.get('/api/facebook', passportConf.isAuthenticated, apiController.getFacebook);
//app.get('/api/scraping', apiController.getScraping);
//app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);
//app.get('/api/lastfm', apiController.getLastfm);
//app.get('/api/nyt', apiController.getNewYorkTimes);
//app.get('/api/twitter', passportConf.isAuthenticated, apiController.getTwitter);
//app.get('/api/aviary', apiController.getAviary);

////LoginViaOAuth2
//app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
//app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }));
//app.get('/auth/github', passport.authenticate('github'));
//app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));
//app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
//app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
//app.get('/auth/twitter', passport.authenticate('twitter'));
//app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
//app.get('/auth/foursquare', passport.authorize('foursquare'));
//app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) { res.redirect('/api/foursquare'); });
//app.get('/auth/tumblr', passport.authorize('tumblr'));
//app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) { res.redirect('/api/tumblr'); });
