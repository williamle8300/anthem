# i can't create sets of music to listen to
## whenever, wherever i am... and with ease
### if someone made this, i would: *use it* and support with *online donations* in exchange for *whatever passive rewards*

# Ideas
SEARCH-ADD-CREATeTRACKSET-BRANCH
_sharing_recommendations_
functional, social, emotional value
"Can I give you my money?"
[Stage 1: FEATURES] • LOOKS • [FEATURES: 'proxy' and choose model 1/2] • SECURITY • REFACTOR • MARKETING-INTRA (IP leaderboards) • EXTRA-MARKETING • NOW YOU CAN ENJOY IT, AND WORK ON PROGRAMMING PROJECTS


Stage 1: Features: "Just Start Making the Tracksets, and Begin Using it"
tracksets, the essential UX (obz?, trackset listings?), shuffle play, sorting tracks, keyboard shortcuts

	create placeholder content for profileIndex.html
	manually create a bunch of playlists!!! w0000000000000!!!!!
	figure out da permalinks
		("Thus, only alphanumerics, the special characters "$-_.+!*'(),", and reserved characters used for their reserved purposes may be used unencoded within a URL.")
	create something to
		- quickly switch between trackSets,
		- or findSongs and play it directly in the trackSet,
		- blend trackSets

	attack the overlay!
		add-to-trackset: allow multiselect, 
		new trackset:
		clone:

	learn mongoose
		learn mongodb
		need-to-know queries
			find()
			count()
		'unique:true, sparse:true'
		sort: ({createdAt .. })
		various event emitters for a mongo object, e.g., 'open'
		creating methods for schemas, e.g.:
			User.methods.totalSig = function(){
				var totalSig = this.own + this.inherited
				return totalSig
			}

	does indexOf actually work? do embedded find queries work?

	"just... begin to make things happen"
	create playlist for unlabeled, proper controllers
	navbar with unlabeled link
	create aobs + modal
		• filtering-by-typing
		• highlight when 1-to-1 typed match, flip 'submit' button
		• no particular ordering for trackSets
	slowly accrete features

	quickest route to having trackSets
		user flows for trackSet modal
		the objects it'll need, and frontend components needed
	don't worry about future changes
	since no changes are 'breaking' changes (no such thing)
	once done with this, iterate new FEATURES into codebase
	
	navbar with trackSets ordered by last modified/played
	 • http://mongoosejs.com/docs/queries.html
	 • https://stackoverflow.com/questions/20895255/how-to-load-document-with-a-custom-id-by-mongoose
	 • https://stackoverflow.com/questions/19093469/mongoose-find-vs-find-where
	 • http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making-with
	 • https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
	 • FOR LOOPS: https://stackoverflow.com/questions/21829789/node-mongoose-find-query-in-loop-not-working

	create nav for trackSets, with ordering by played-modified, 
	add frosting to trackSet modal (typed autofiltering; ordering by p/m; glowing/altering button; highlight when 1-to-1 typed match; last typed trackSet cache)
	create nav button for unlabeled

	create routing when trackset permIDs are used. should be identical
	redo profile page
	
	add numbering in .leftPanel
	
	sort tracks in unlabeled, and TS1, TS2, ...
	
	list of 10 tracks, most-played

	DOWNLOAD?? RADIO LINKS ONLY??
	SHUFFLE PLAY!
	SORT TRACKS!
	SIGNALS & PERMALINKS! 


Stage 2: Alpha [3]	

	progress buttons: http://tympanus.net/Development/ProgressButtonStyles/
	autocomplete searching by artist. display results. user can parse to trackset at that point (e.g. "remi|x..."

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

	(make searching for tracks a lot faster: http://karan.github.io/scInstant/)
	feature: proxy thUser's trackset

	go super public!


Stage 4: Beta [15]

	blend two/more tracksets together

	make paid & free iOS app (see "Noon Pacific" as paid example: https://itunes.apple.com/us/app/noon-pacific/id803563983?mt=8)
	for "touch" events
		- https://stackoverflow.com/questions/3026915/how-can-i-make-a-jquery-ui-draggable-div-draggable-for-touchscreen
		- drag-drop for sorting: http://jqueryui.com/droppable/#photo-manager
	offer something awesome-hilarious-very-unnecessary
	create and offer the paid plans
	scale hosting service/refactor/document/re-architect?)
	Start-December 2014, Financial Model

	**$30/year**
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
	
	**$20/year**
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
	downloading. Zipping files with JS: http://stuk.github.io/jszip/
	voting for next track?
	"rooms." all users tracksets are merged together, and vote for the next played song.
	security measures to detect abuse (e.g., automate or deluge of user activity); bogus accounts/activity
	offer media hosting
	'followed' most popular tracksets; 'followed' recent modified tracksets; 'followed' user's listening history
	"/" to blend >2
	 • "./williamle8300?trackset=fleetwood-mac-rumors,the-beatles-white-album"
	";" to re-sort all tracks *after* the q'd track


# !SHIMS

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



# Visual Identity; tint everything (https://dribbble.com/shots/1524101-Cafe/attachments/230585)
	MOODBOARD: http://stp.so/JxhU | http://dribbble.com/shots/1509811-Dashboard-Activity | http://dribbble.com/shots/1512819-Antigo/attachments/228110 |
	colors/proportions: http://dribbble.com/shots/1487542-Survey-Results-Dashboard?list=users&offset=0
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

## Setting up environment (Codeship.io, Modulus.io, Heroku)

	• Install phantomjs, casperjs, mongodb, lessc, grunt-cli binaries;
	• $ sudo npm install -g nodemon && npm install
	• $ cd public/css/lib/bootstrap && npm install #for some reason it needs phantom and might try to download a new phantomJS binary
	• $ grunt watch
	• $ mongod #start the mongodb server... and heeere we go!s
	• $ cd /
	• $ nodemon -e js,html,css app

# Target Market. Selling points "it's free, legal, social, and just better!"
	- self-employed/freelancerse/work-from-home: rogie king, frank chimero (rdio user)
	- or people who work at computers all day (by themselves); remote working;
	- musicians: kaytranada, monsieur adi, rac; for what's important to music, look at the nav bar at: http://www.motorcitydrumensemble.com/
	- major music blogs (the tastemakers), e.g., give them a way to do HTML embeds so they can feature

# Sample TrackSets (see: Pandora Radio's Pre-made TrackSets)
	- "The Daily Grind," 'Open Eye Signal', 'Mister Murky Socks', 'L.O.V.E.' by Motor City ..(rmx by DJ Kicks), Jet by Wings, Motor City Drum Ensemble,
	- "Electro-clash!!!!," College, Electric Youth, ..
	- "Rolling Stone Top 100 singers," CF.: http://www.rollingstone.com/music/lists/100-greatest-singers-of-all-time-19691231/sam-cooke-20101202
	- "70s Swagga," cool woman in black dress, tiny dancer, stuck in the middle, jet
	- "SO MUCH WOW," Fatboy Slim, "Praise You"; The Killers, "Day & Age";
	- "Kicktranada," only DJ Kicks and Kaytranada tracks
	- "Henry Rollins WeekX" ...
	- "Canadian Indierock," Feist, Broken Social Scene, Arcade Fire 
	- "Crazy Awesome Remixes," moon boots remix of CHVRCHES mother we share, chvrches remix of MR MS' "Hurricane", Paris by Au Revoir Simone (remix by Aeroplane)
	- "SPARKLENATION," nyan cat song, koopa beach remix, Live in this City (Dragonette), Love Triangle by N.O.,
	- "Best of DJ Kicks," L.O.V.E. by Motor City ..,
	- "Burial-Fourtet Sessions"
	- "Woodstock 1969," Joe Cocker, Jimi Hendrix, CCR
	- "Dream of the 90s" The Cardigans, Matchbox 20, Goo Goo Dolls, No Doubt, Nirvana, Garbage, The Breeders, Alice Deejay, 'No diggity'
	- "Dream of the 90s (REEEEEMIIIIIIX)" ..
	- "90s R&B," Toni Braxton, 'If' by Janet Jackson, 'end of the road' Boyz II Men
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
$			at RequestStream.EventEmitter.addListener (events.js:160:15)
$			at new StreamClient (/Users/William/Desktop/onRepeat2/node_modules/spooky/node_modules/tiny-jsonrpc/lib/tiny-jsonrpc/stream-client.js:36:29)
$			at new Spooky (/Users/William/Desktop/onRepeat2/node_modules/spooky/lib/spooky.js:75:27)
$			at phantomSoundCloud (/Users/William/Desktop/onRepeat2/node_modules/phantomFunctions/index.js:18:16)
$			at /Users/William/Desktop/onRepeat2/controllers/home.js:31:3
$			at callbacks (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:164:37)
$			at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:138:11)
$			at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:135:11)
$			at pass (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:145:5)
$			at Router._dispatch (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:173:5)
$	(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
$	Trace
$			at RequestStream.EventEmitter.addListener (events.js:160:15)
$			at new StreamClient (/Users/William/Desktop/onRepeat2/node_modules/spooky/node_modules/tiny-jsonrpc/lib/tiny-jsonrpc/stream-client.js:37:29)
$			at new Spooky (/Users/William/Desktop/onRepeat2/node_modules/spooky/lib/spooky.js:75:27)
$			at phantomSoundCloud (/Users/William/Desktop/onRepeat2/node_modules/phantomFunctions/index.js:18:16)
$			at /Users/William/Desktop/onRepeat2/controllers/home.js:31:3
$			at callbacks (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:164:37)
$			at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:138:11)
$			at param (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:135:11)
$			at pass (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:145:5)
$			at Router._dispatch (/Users/William/Desktop/onRepeat2/node_modules/express/lib/router/index.js:173:5)
$	[info] [phantom] Step anonymous 3/3 http://m.soundcloud.com/tracks/search?q=debussy (HTTP 200)
$	[info] [phantom] Step anonymous 3/3: done in 5631ms.
$	[info] [phantom] Step _step 4/4 http://m.soundcloud.com/tracks/search?q=debussy (HTTP 200)
$	[info] [phantom] Step _step 4/4: done in 5651ms.
$	[debug] [phantom] Navigation requested: url=http://s3-us-east.cdnplanet.com/static/rum/xhr-20130809.html?cdn=111&t=1391727639239, type=Other, willNavigate=true, isMainFrame=false
$	[debug] [phantom] Navigation requested: url=http://onapp.cdnplanet.com/static/rum/xhr-20130809.html?cdn=37&t=1391727639239, type=Other, willNavigate=true, isMainFrame=false
$	[debug] [phantom] Navigation requested: url=http://awsdns-validation.com/static/rum/xhr-20130809.html?cdn=114&t=1391727639239, type=Other, willNavigate=true, isMainFrame=false

# License
The MIT License (MIT)

Copyright (c) 2014 William Le

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Ø and "∅" (U+2205)
OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Ø and "∅" (U+2205)