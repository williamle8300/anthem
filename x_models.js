

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

_trackSet.list[3].setID // 4451
_trackSet.list[3].setList // [948548, 7785422, 949331, 410200, 1103948, 991222]

_trackset: {
	list: [
		{
	   name: 'LABELED',//everytime anything is done with a trackSet (e.g., saves, removes)
	   setID: 0,
	   setList: [948548, 7785422, 949331, 410200, 1103948, 991222, 948548, 7785422, 949331, 410200, 1103948, 991222, 948548, 7785422, 949331, 410200, 1103948, 991222],
	  },
		•••
		{
	   name: 'Canadian Indie',
	   setID: 4451,
	   setList: [948548, 7785422, 949331, 410200, 1103948, 991222]
	  },
	  •••
	]
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
