http://anthem.com/williamle8300/unlabeled
http://anthem.com/williamle8300/labeled
http://anthem.com/williamle8300/trackset/Canadian20%Indie/
http://anthem.com/williamle8300/trackset/Dream20%of20%the20%90s
http://anthem.com/williamle8300/trackset/Canadian20%Indie/Best20%Of20%SubPop/Dream20%of20%the20%90s
http://anthem.com/search/monsieur20%adi


level 1: curators

search, add one-by-one, parse into tracksets
share with others
gain signals
dominate genres, and become a recognized tastemaker
loves the features offered for quickly navigating, saving tracks, and creating new trackSets

level 2: ...

saw something on facebook; keeps hearing about it
clones a bunch of tracksets (maybe begins a small trackset for themselves)
listens, and enjoys checking out other's trackSets
slowly sees the value of gaining higher signal counts for their trackSets


gitignore the md files
how to organize the model (considering there will be a global API cache)?
DRAW OUT FLOW CHART OF BACKEND WORKING for VARIOUS REQs


learn mongoose						
	mongodb 
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
dl extension to "remember password" even on localhost.

"just... begin to make things happen"
create playlist for unlabeled, proper controllers
navbar with unlabeled link
aobs + modal
slowly accrete features

####
collection: {
	unlabeled: [991222, 1103948, 948548, 7785422, 949331, 410200],
	labeled: [1103948, 7785422, 949331, 223310, 11322],
	trackSets: {
		list: [ {name: 'Canadian Indie', permID: 2, setList: [948548, 7785422, 949331, 410200, 1103948, 991222], signed: [signedAt: '', own: 3978, inherited: 2933]}, ••• ],
		lastPlayed: [•permIDs•],
		lastModified: [•permIDs•]
	}
}
####

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