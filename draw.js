$.ajax({
	type: "GET",
	url: "/getCachedTrackObj/474764",
	async: false,
	success: function(cachedTrackObj) {
		//if (cachedTrackObj) { alert('true!') } else { alert('false!') };
		console.log(cachedTrackObj.encodedObjHTML);
	}
});

//http://anthem.com/williamle8300/unlabeled
//http://anthem.com/williamle8300/trackset/Canadian20%Indie
//http://anthem.com/williamle8300/trackset/Dream20%of20%the20%90s
//http://anthem.com/williamle8300/trackset/Canadian20%Indie/Best20%Of20%SubPop/Dream20%of20%the20%90s
//http://anthem.com/search/monsieur20%adi

collection.unlabeled[0].resourceID // '38412'
collection.unlabeled[0].encodedObjHTML // #%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%#..
collection.trackSets.list[0].setList.indexOf(removeResourceID) // [•••] (use indexof; or recusive findall for performance;)

User: {
	...
	collection: {
		unlabeled: [991222, 1103948, 948548, 7785422, 949331, 410200],
		labeled: [1103948, 7785422, 949331, 223310, 11322, 7785422, 949331, 223310, 11322, 7785422, 949331, 223310, 11322, 7785422, 949331, 223310, 11322, 7785422, 949331, 223310, 11322, 7785422, 949331, 223310, 11322, 7785422, 949331, 223310, 11322],
		trackSets: {
			list: [ {permID: 2, name: 'Canadian Indie', setList: [948548, 7785422, 949331, 410200, 1103948, 991222], _sign: {signedAt: 'mawtrombone/trackset/478', own: 3978, borrowed: 2433} }, ••• ],
			lastPlayed: [•(trackSet permIDs)•],
			lastModified: [•(trackSet permIDs)•]
		}
	}
	...
}

//===========================//
//=====APICALLCACHE==========//
//===========================//

cachedAPICalls: [
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
  {
    resourceID: '183820',
    encodedObjHTML: '#%##%##%##%##%##%##%##%##%#'
  }
]


#### *SEARCH RESULTS*

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_

#### UNLABELED

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_

#### LABELED

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_

#### X

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_

#### !LABELED

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_

#### !X (PEPPER WHITE)

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_


#### !X (PEPPER)

[SAVE]
_unlabeled_
_labeled_
_x_

[REMOVE]
_unlabeled_
_labeled_
_x_

[ADD-TO-TRACKSET]
_unlabeled_
_labeled_
_x_

[CREATE-NEW-TRACKSET]
_unlabeled_
_labeled_
_x_