
module.exports = {};
module.exports.phantomSoundCloud = phantomSoundCloud;

/**
 * phantomSoundCloud()
 * return handlePhantomResults(phantomResults)
 * @param {string} query; {function} handlePhantomResults
 * @return {object}
 * @api public
 *
 * https://soundcloud.com/search/sounds?q=['query']
 * var phantomResults.trackSet = [ {track} (,{track},...) ]
 *
 */
function phantomSoundCloud(query, handlePhantomResults) {
  var Spooky = require('spooky');
  var casper = new Spooky({
    child: {
        transport: 'http'
    },
    casper: {
      logLevel: 'debug',
      verbose: true,
    pageSettings: {
      //must use Mobile Safari for SoundCloud for fast search
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
        loadImages:  false,
        loadPlugins: false
      }
    }
  }, function(err) {
    if (err) {
      e = new Error('Failed to initialize SpookyJS');
      e.details = err;
      throw e;
    }
    casper.start('http://m.soundcloud.com/tracks/search?q=' +query);
    casper.then(function() {
    this.waitForSelector('ul.list-items.tracks', function(){
      this.emit('onLoad', this.evaluate(function() { //!
        if (document.querySelectorAll('ul.list-items.tracks li').length == 0) {
        return {trackSet: 0}
        } else {
        var list = document.querySelectorAll('ul.list-items.tracks li[data-sc-track-id]');
        var listLen = list.length;
        var trackSet = [];
			  for (var i = 0; i < listLen; i++) {
			    trackSet[i] = {};
			    trackSet[i].seq = i+1;
			    trackSet[i].permachunk = list.item(i).querySelector('div.inner a').getAttribute('href');
			    trackSet[i].trackTitle = list.item(i).querySelector('div.inner a p.title').textContent;
			    trackSet[i].albumArtURI = (function() {if (list.item(i).querySelector('div.inner div.tmb img')) {  return list.item(i).querySelector('div.inner div.tmb img').getAttribute('src');} else {  return 'http://www.basekit.com/widget/image/placeholder.png'}})(); //handling tracks where there isn't album art
			    trackSet[i].username = list.item(i).querySelector('div.inner a h3.uploader').textContent.trim();
			    trackSet[i].playCount = (function() {if (list.item(i).querySelector('ul.mini li.plays').textContent) {return list.item(i).querySelector('ul.mini li.plays').textContent;} else {return '[private]';}})(); //handling tracks where playcounts privatized on SoundCloud
			    trackSet[i].published = list.item(i).querySelector('div.inner a span.uploaded').textContent;
			  }
        return {trackSet: trackSet} //phantomResults#{ trackSet: OBJECT Array }
        }
        }));
    });
    });
    casper.run();
  });
  casper.on('onLoad', function (phantomResults) {
    phantomResults.trackSet = phantomResults.trackSet.slice(0,20); //just display 20 tracks to the user for now.
    return handlePhantomResults(phantomResults);
  });
  casper.on('error', function (e, stack) {
      console.error(e);
      if (stack) {
          console.log(stack);
      }
  });
  casper.on('console', function (line) {
      console.log(line);
  });
  casper.on('log', function (log) {
      if (log.space === 'remote') {
          console.log(log.message.replace(/ \- .*/, ''));
      }
  });
}
