

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

_track: {
  list: [
    {
      resourceID: '384859',
      encodedObjHTML: '#%##%##%##%##%##%##%##%##%#',
      tracksetMemberOf: [324, 2341901, 4451, 85810],
    },
    {
      resourceID: '221',
      encodedObjHTML: '#%##%##%##%##%##%##%##%##%#',
      tracksetMemberOf: [],
    },
    •••
  ]
}

//===========================//
//===========TRACKSETS=======//
//===========================//

collection.unlabeled[0].resourceID // '38412'
collection.unlabeled[0].encodedObjHTML // #%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%##%#..
collection.trackSet[i].setList.indexOf(removeResourceID) // [•••] (use indexof; or recusive findall for performance)

collection: {
	unlabeled: [•],
	labeled: [•],
	trackSets: [ {name: 'Canadian Indie', permID: 2, setList: [948548, 7785422, 949331, 410200, 1103948, 991222]}, ••• ]
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
