
/*
 * GET home page.
 */

//POST <form/> origin
exports.runSearch = function(req, res){
	var query = encodeURIComponent(req.body.query); //`query` is `name` attr of <input/>
	console.log(encodeURIComponent(req.body.query));
	res.location('search/' +query);
	res.redirect('search/' +query)
};

//GET
exports.returnSearch = function(scrape) {
	return function(req, res){
		var query = req.params.query;
		scrape(query, function(results){
			if(results.trackSet == 0){
				console.log('\n Didn\'t find any tracks.\n');
				res.render('404.html', {title: 'On Repeat', query: query})
			}
			else{
				console.log('\n Found [' +results.trackSet.length+ '] tracks.\n');
				res.render('returnSearch.html', {title: 'On Repeat', query: query, trackSet: results.trackSet});
			}
		});
	};
};

//212b7a5080f5d7f8e831583446771a02