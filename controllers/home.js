/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('search.html', {
    title: 'On Repeat'
  });
};
