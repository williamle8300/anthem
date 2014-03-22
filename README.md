# Ideas
SEARCH-ADD-CREATeTRACKSET-BRANCH
_sharing_recommendations_
functional, social, emotional value
"Can I give you my money?"


_track {
	list: [
		{
			ID,
			PROVIDER,
			PLAYCOUNT,
			ENCODEDHTMLOBJ,
			TRACKSETS: [
				{
					ID,
					SEQU
				}
			]
		}
	]
}

_trackSets


Stage 1: Alpha [1]
add • delete • organize tracksets

	create app-wide/global model to store every API search/resolve call
  login with username instead of email
	establish the modol mon!
  learn Atom!

  "save track(s)" to user._track.list
 		wid da propa modol mon
  Create tracksets
	 • "/williamle8300?trackset=canadian-indierock"
	 • "/williamle8300?trackset=burial-fourtet"
	 • "/williamle8300?trackset=progressive-house"
	 • "/williamle8300?trackset=motor-city-remixes"
  "Remove track(s) from trackset"
  "Add to a trackset..."
  [¡Delete trackset!]
  filter by 'labeled' and 'unlabeled' tracks
  filter tracks by 'labeled', 'unlabeled', 'trackSets'
  navbar with trackSets ordered by last modified/played
  realize user schema (how to do sorting of tracks?)
	 • http://mongoosejs.com/docs/queries.html
	 • https://stackoverflow.com/questions/20895255/how-to-load-document-with-a-custom-id-by-mongoose
	 • https://stackoverflow.com/questions/19093469/mongoose-find-vs-find-where
	 • http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making-with
	 • https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
	 • FOR LOOPS: https://stackoverflow.com/questions/21829789/node-mongoose-find-query-in-loop-not-working



Stage 2: Alpha [3]
on-proxy before post-proxy

  autocomplete searching by artist. display results. user can org to trackset at that point (e.g. "remi|x...")
  nail down keybindings! make it so people can stuff quick: like searching, selecting, adding, and creating/cloning tracksets

  social aspects
	 • user receiving three messages =translates= logging their activity to build the "Similar Tracks:" graph

  privatized on github
	Reset password: https://github.com/sahat/hackathon-starter/blob/master/app.js; http://sahatyalkabov.com/2014/02/26/how-to-implement-password-reset-in-nodejs/
  deploy Anthem online
  start public beta!

  homepage
	 • notify when 'branched' tracklist is modified, offer update-merge option, plus 1!
	 • user's listening history; most played;
  proper scrolling
  remedy cross-browser probz

  DESKTOP-READY!
  make Mac App or Chrome and Safari Extension
  re-do Show HN


Stage 3: Alpha [5]					!!!magic number
roxit

  feature: proxy thUser's trackset


Stage 4: Beta [15]
  make paid & free iOS app (see "Noon Pacific" as paid example: https://itunes.apple.com/us/app/noon-pacific/id803563983?mt=8)
  for "touch" events
 		- https://stackoverflow.com/questions/3026915/how-can-i-make-a-jquery-ui-draggable-div-draggable-for-touchscreen
		- drag-drop for sorting: http://jqueryui.com/droppable/#photo-manager
  offer something awesome-hilarious-very-unnecessary
  create and offer the paid plans
• scale hosting service/refactor/document/re-architect?)
  Start-December 2014, Financial Model
# $30/year
  Can opt-in to be perpetually listed at "Supporters Page" as beta patron
  100 playlists
  30000 playbacks/month
  50% goes to _EFF_TOR_
  Donations
  half goes to our partners (SoundCloud, hosting service, musicians)
  half goes to _EFF_TOR_
  donors can opt for listing in "Supporters Page" as "commercial sponsor" (based on descending order of donation amount)


Stage 5: Open to Public [80]

  how to create recommendation graph? ex: "those that have been "shared to" by 3+ people have their 'labels' tabulated"
	 • SIMILAR TRACKS (3): (for each track: get 3 other tracks at the top of 3 different playlists; 5 tracks for premium users)
	 • RECOMMENDED TRACKS: on homepage; based on listening history (culled from similar tracks)


Stage 6: "Let's Fail!" []

  offer member plan
  December 2014-onward, Financial Model
# $20/year
  get up to 5 recommendations per track
  100 playlists
  30000 playbacks/month
  50% goes to _EFF_TOR_


Stage: Future!
  FEATURE LIST
  richer searching experience; seamless searching and playback of music
  submit mp3 URIs
  sort tracks
  download profile data (as CSV)
  downloading
  voting for next track?
  "rooms." all users tracksets are merged together, and vote for the next played song.
  security measures to detect abuse (e.g., automate or deluge of user activity); bogus accounts/activity
  offer media hosting
  'followed' most popular tracksets; 'followed' recent modified tracksets; 'followed' user's listening history
  "/" to blend >2
	 • "./williamle8300?trackset=fleetwood-mac-rumors,the-beatles-white-album"
  ";" to re-sort all tracks *after* the q'd track


!SHIMS
(solved)
- escapeHTML
- [Array].indexOf
- HTMLElement.dataset
(unsolved)
- css opacity:
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  /* IE 5-7 */
  filter: alpha(opacity=0);
  /* Netscape */
  -moz-opacity: 0;
  /* Safari 1.x */
  -khtml-opacity: 0;
  /* Good browsers */
  opacity: 0;



Visual Identity
http://stp.so/JxhU
for typographic rhythm, and layout: http://andrewtarcon.com/
LANDING PAGE: https://www.threadmeup.com/
http://dribbble.com/shots/1429401-karbar-main/attachments/210024
http://dribbble.com/shots/1423947-App-Pricing/attachments/208766
http://dribbble.com/shots/1423878-My-Portfolio-Website?list=popular&offset=23
social login buttons: http://dribbble.com/shots/1424399-Sign-In-Sign-Up/attachments/208880
typeface: Berthold Akzidenz Grotesk (seen at: http://www.alexanderradsby.com/)
live searching ex: http://hn.algolia.com/; http://www.jsdelivr.com/
analytics: http://dribbble.com/shots/1423171-Some-Analytics/attachments/208613
http://tympanus.net/Development/PerspectivePageViewNavigation/index5.html
http://heroku.com
http://getbootstrap.com

# running the app
## Setting up environment
• Install phantomjs, casperjs, mongodb, lessc, grunt-cli binaries;
• $ sudo npm install -g nodemon && npm install
• $ cd public/css/lib/bootstrap && npm install #for some reason it needs phantom and might try to download a new phantomJS binary
• $ grunt watch
• $ mongod #start the mongodb server... and heeere we go!
• $ cd /
• $ nodemon -e js,html,css app

# Target Market
- self-employed/freelancerse/work-from-home: rogie king, frank chimero (rdio user)
- or people who work at computers all day (by themselves); remote working;
- musicians; for what's important to music, look at the nav bar at: http://www.motorcitydrumensemble.com/
- major music blogs (the tastemakers), e.g., give them a way to do HTML embeds so they can feature

# Sample TrackSets (see: Pandora Radio's Pre-made TrackSets)
- "The Grind," Jon Hopkins, Motor City Drum Ensemble, Flying Lotus
- "[trackSet]," cool woman in black dress, tiny dancer, stuck in the middle, jet
- "SO MUCH SMILE," Fatboy Slim, "Praise You"; The Killers, "Day & Age";
- "Canadian Indierock," Feist, Broken Social Scene, Arcade Fire
- "Crazy Awesome Remixes," moon boots remix of CHVRCHES mother we share,
- "Burial-Fourtet Sessions"
- "Woodstock 1969," Joe Cocker, Jimi Hendrix, CCR
- "Dream of the 90s" The Cardigans, Matchbox 20, Goo Goo Dolls, No Doubt, Nirvana, Garbage, The Breeders, Alice Deejay
- "The 27 Club," Kurt Cobain, Amy Winehouse, Jimi Hendrix, Jim Morrison
- "hypem weekly," (weekly tracks)
- "Bob Dylan"
- "Drive OST"
- "Bit Crushin'," Radiohead's Kid A
- "It Was All a Dream," Wu Tang Clan, Tribe Called Quest, Mos Def, Notorious B.I.G., Tupac
- "Progressive House": SBTRKT

#investigate memory leak
$	POST /postSearch 302 4ms - 92b
$	(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
$	Trace
$	    at RequestStream.EventEmitter.addListener (events.js:160:15)
$	    at new StreamClient (/Users/William/Desktop/onRepeat2/node_modules/spooky/node_modules/tiny-jsonrpc/lib/tiny-jsonrpc/stream-client.js:36:29)
$	    at new Spooky (/Users/William/Desktop/onRepeat2/node_modules/spooky/lib/spooky.js:75:27)
$	    at phantomSoundCloud (/Users/William/Desktop/onRepeat2/node_modules/phantomFunctions/index.js:18:16)
$	    at /Users/William/Desktop/onRepeat2/controllers/home.js:31:3
$	    at callbacks (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:164:37)
$	    at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:138:11)
$	    at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:135:11)
$	    at pass (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:145:5)
$	    at Router._dispatch (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:173:5)
$	(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
$	Trace
$	    at RequestStream.EventEmitter.addListener (events.js:160:15)
$	    at new StreamClient (/Users/William/Desktop/onRepeat2/node_modules/spooky/node_modules/tiny-jsonrpc/lib/tiny-jsonrpc/stream-client.js:37:29)
$	    at new Spooky (/Users/William/Desktop/onRepeat2/node_modules/spooky/lib/spooky.js:75:27)
$	    at phantomSoundCloud (/Users/William/Desktop/onRepeat2/node_modules/phantomFunctions/index.js:18:16)
$	    at /Users/William/Desktop/onRepeat2/controllers/home.js:31:3
$	    at callbacks (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:164:37)
$	    at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:138:11)
$	    at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:135:11)
$	    at pass (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:145:5)
$	    at Router._dispatch (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:173:5)
$	[info] [phantom] Step anonymous 3/3 http://m.soundcloud.com/tracks/search?q=debussy (HTTP 200)
$	[info] [phantom] Step anonymous 3/3: done in 5631ms.
$	[info] [phantom] Step _step 4/4 http://m.soundcloud.com/tracks/search?q=debussy (HTTP 200)
$	[info] [phantom] Step _step 4/4: done in 5651ms.
$	[debug] [phantom] Navigation requested: url=http://s3-us-east.cdnplanet.com/static/rum/xhr-20130809.html?cdn=111&t=1391727639239, type=Other, willNavigate=true, isMainFrame=false
$	[debug] [phantom] Navigation requested: url=http://onapp.cdnplanet.com/static/rum/xhr-20130809.html?cdn=37&t=1391727639239, type=Other, willNavigate=true, isMainFrame=false
$	[debug] [phantom] Navigation requested: url=http://awsdns-validation.com/static/rum/xhr-20130809.html?cdn=114&t=1391727639239, type=Other, willNavigate=true, isMainFrame=false

# models
//sorting a track reorganizes it in db also
//whether in "tracks" view, or "trackset" view

//===========================//
//===========TRACKS==========//
//===========================//
_track: {
	list: [
		{
			resourceID: '384859',
			provider: 'soundcloud_com'
			encodedObjHTML: '#%##%##%##%##%##%##%##%##%#',
			playCount: 3949,
			tracksetMemberOf: [324, 2341901, 4451, 85810]
		} ,•••
	]
}

//===========================//
//===========TRACKSETS=======//
//===========================//

tracksets: [
	{
		setID: 4,
		set: ["SC_948548", "SC_7785422", "SC_949331", "SC_410200", "SC_1103948", "SC_991222"]
		sign: 'Best of Pete Seeger',
		signedAt: {userID: 'ObjectId("52f45b6c26951600000511d7")', setID: '32', urlForm: 'mawtrombone?trackset=pete-seeger-classics'},
		signals: [
			{userID: 'ObjectId("52f45b6c269516000007")', setID: '32'},
			{userID: 'ObjectId("12x195b6c2695160000d7")', setID: '21'},
			{userID: 'ObjectId("22x19512x192695160011d7")', setID: '33'},
			{userID: 'ObjectId("3442x19512x19269517")', setID: '17'},
			{userID: 'ObjectId("342a2f4512x19269516057")', setID: '4'}
		],
		playCount: 2093
	},
	•••
]

//===========================//
//=====APICALLCACHE==========//
//===========================//

cachedAPICalls: [
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
	{
		resourceID: 'SC_183820',
		encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
	}
]

# License
The MIT License (MIT)

Copyright (c) 2014 William Le

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
