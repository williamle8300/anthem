

//PATH ONE
//people CLONE complete 'trackSets'
//people listen to 'trackSets'
//people add/remove 'trackSets'
//DONE

//PATH TWO
//people ADD SONGS to 'unlabeled'
//people PARSE 'unlabeled' *into* actual 'trackSets'
//DONE
//-option: shuffle play
//-option: sort tracks in trackSets

//===========================//
//===========TRACKS==========//
//===========================//
//
//_track: {
//  list: [
//    {
//      resourceID: '384859',
//      encodedObjHTML: '#%##%##%##%##%##%##%##%##%#',
//      tracksetMemberOf: [324, 2341901, 4451, 85810],
//    },
//    {
//      resourceID: '221',
//      encodedObjHTML: '#%##%##%##%##%##%##%##%##%#',
//      tracksetMemberOf: [],
//    },
//    •••
//  ]
//}
//
//===========================//
//===========TRACKSETS=======//
//===========================//

collection.unlabeled[0].resourceID // '38412'
collection.unlabeled[0].encodedObjHTML // #%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%#..
collection.trackSets.list[0].setList.indexOf(removeResourceID) // [•••] (use indexof; or recusive findall for performance;)

collection: {
	unlabeled: [991222, 1103948, 948548, 7785422, 949331, 410200],
	labeled: [1103948, 7785422, 949331, 223310, 11322],
	trackSets: {
		list: [ {name: 'Canadian Indie', permID: 2, setList: [948548, 7785422, 949331, 410200, 1103948, 991222], signed: [signedAt: 'mawtrombone/trackset/478', own: 3978, inherited: 2433]}, ••• ],
		lastPlayed: [•permIDs•],
		lastModified: [•permIDs•]
	}
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
