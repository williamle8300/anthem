
/**   
 * GET
 * for routes: '/', '/search'
 */
exports.search = function(req, res){
	res.render('search.html', {app: 'On Repeat', title: 'Search', view: 'Search'});
}

/**
 * POST
 * Gets value of searchbox
 * @param {string} query
 */
exports.postSearch = function(req, res){
	var query = encodeURIComponent(req.body.query); //`query` is `name` attr of <input/>
	console.log('\n ...Searching "' +encodeURIComponent(req.body.query)+ '"\n ');
	res.location('search/' +query);
	res.redirect('search/' +query)
};

/**
 * GET /search/{query}
 * Runs phantomFunctions and displays search results
 * @param {function} sentinelSoundCloud
 * @param {string} query
 */
exports.getSearchResults = function(sentinelSoundCloud) {
	return function(req, res){
		var query = req.params.query;//from url: "/search/{query}"
		sentinelSoundCloud(query, function(phantomResults){
			if(phantomResults.trackSet == 0){
				console.log('\n Found [' +phantomResults.trackSet.length+ '] tracks.\n');
				res.render('404.html', {app: 'On Repeat', title: '404', query: query});
			}
			else{
				console.log('\n Found [' +phantomResults.trackSet.length+ '] tracks.\n');
				res.render('returnSearch.html', {app: 'On Repeat', title: 'Results for "' +query+ '"', query: query, trackSet: phantomResults.trackSet});
			}
		});
	};
};

//212b7a5080f5d7f8e831583446771a02