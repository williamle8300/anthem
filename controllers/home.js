
/**   
 * GET
 * for routes: '/', '/search'
 */
exports.search = function(req, res){
	res.render('searchPage.html', {app: 'Anthem', title: 'Search', view: 'Search'});
}

/**
 * POST
 * Gets value from searchbox
 * @param {string} query
 */
exports.postSearch = function(req, res){
	var query = encodeURIComponent(req.body.query); //`query` is `name` attr of <input/>
	console.log('\n ...Searching "' +query+ '"\n ');
	res.location('search/' +query);
	res.redirect('search/' +query)
};

/**
 * GET /search/{query}
 * Runs phantomFunctions and displays search results to user
 * @param {function} phantomSoundCloud
 * @param {string} query
 */
exports.getSearchResults = function(phantomSoundCloud) {
	return function(req, res){
		var query = req.params.query;//from url: "/search/{query}"
		phantomSoundCloud(query, function handlePhantomResults(phantomResults){
			if(phantomResults.trackSet == 0){
				console.log('\n Found [0] tracks\n');
				res.render('404.html', {app: 'Anthem', title: '404', query: query});
			}
			else{
				console.log('\n Found [' +phantomResults.trackSet.length+ '] tracks\n');
				res.render('search/index.html', {app: 'Anthem', title: 'Results for "' +query+ '"', query: query, trackSet: phantomResults.trackSet});
			}
		});
	};
};

//212b7a5080f5d7f8e831583446771a02