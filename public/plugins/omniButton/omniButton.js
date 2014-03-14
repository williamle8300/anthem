
//omniButton's coords
var omniButton = {top:0, left:0};
//halved widths for accurate placement of elements
var omniButtonWidthHalved = 60/2;
var aobWidthHalved = 50/2;
//where did the user make intial click?
var mouseInitialTop = 0;
var mouseInitialLeft = 0;
//where did the user mouseup?
var mouseTerminusTop = 0;
var mouseTerminusLeft = 0;
//a fixed button distance
var bDist = 150;
//index of 'pulled' aob in [aobs Array]
var idx_of_selected_aob = false;
//default value
var controlsShown = false;

$(function () {
	$(document).bind("contextmenu", function (e) {//disable contextmenu
    return false;
	});
	$(document).on('mousedown', function(e) {//toggle #omniButton
		switch (e.which) {
			case 3://right-click mousecode
				$("#omniButton").css({ top : e.pageY - omniButtonWidthHalved, left: e.pageX - omniButtonWidthHalved });
				$('#omniButton').fadeTo('fast' , 0.7);
				$('#omniButton').simulate("drag", {dragStart: {y: e.pageY, x: e.pageX}});
				e.preventDefault();
		}
	});
  $('#omniButton').on('mousedown', function (e) {//show aobs (anOmniButton)
		mouseInitialTop = e.pageY;
		mouseInitialLeft = e.pageX;
    showControls(mouseInitialTop, mouseInitialLeft);
    e.preventDefault();
  });
  $(document).on('mouseup', function (e) {//hide aobs
		mouseTerminusTop = e.pageY;
		mouseTerminusLeft = e.pageX;
		$('#omniButton').fadeTo('fast' , 0);
    hideControls(mouseTerminusTop, mouseTerminusLeft);//everything moves there
    e.preventDefault();
  });
  $('#omniButton').draggable({//fires whenever #omniButton is dragged to calc distance between it and all .aobs (< 100px threshold)
    drag: function (e, ui) {
      checkProximity(e, ui);
    }
  });
});

function showControls(mouseInitialTop, mouseInitialLeft) {
  controlsShown = true;//console.log('showing .aob');
  $('.aob').addClass('active');
	//How-to-use springTo: elementSpringTo(ELEMENT, TARGETX, TARGETY, [STIFFNESS, MASS, FRICTION],)
  elementSpringTo('#aob0', mouseInitialLeft-bDist-aobWidthHalved, mouseInitialTop-aobWidthHalved, [140, 8, 3]);//look at me!
  elementSpringTo('#aob1', mouseInitialLeft-aobWidthHalved, mouseInitialTop-bDist-aobWidthHalved, [140, 8, 3]);//look at me!
  elementSpringTo('#aob2', mouseInitialLeft+bDist-aobWidthHalved, mouseInitialTop-aobWidthHalved, [140, 8, 3]);//look at me!
}
function hideControls(mouseTerminusTop, mouseTerminusLeft) {
  if (controlsShown == true) {
    controlsShown = false;//console.log('hid .aob');
    idx_of_selected_aob = false;//reset this
    $('.aob').removeClass('active');
		//How-to-use springTo: elementSpringTo(ELEMENT, TARGETX, TARGETY, [STIFFNESS, MASS, FRICTION],)
		elementSpringTo('#omniButton', mouseTerminusLeft-omniButtonWidthHalved, mouseTerminusTop-omniButtonWidthHalved, [100, 9, 4]);//#omniButton goes to mouseup coords;
    elementSpringTo('#aob0', mouseTerminusLeft-aobWidthHalved, mouseTerminusTop-aobWidthHalved, [140, 8, 3]);//byee!
    elementSpringTo('#aob1', mouseTerminusLeft-aobWidthHalved, mouseTerminusTop-aobWidthHalved, [140, 8, 3]);//byee!
    elementSpringTo('#aob2', mouseTerminusLeft-aobWidthHalved, mouseTerminusTop-aobWidthHalved, [140, 8, 3]);//byee!
  }
}
function checkProximity(e, ui) {
	omniButton.top = ui.position.top;
	omniButton.left = ui.position.left;
  var aobs = [{//list aobs here!
    name: '#aob0',
    oX: mouseInitialLeft-aobWidthHalved-bDist,
    oY: mouseInitialTop-aobWidthHalved
  }, {
    name: '#aob1',
    oX: mouseInitialLeft-aobWidthHalved,
    oY: mouseInitialTop-aobWidthHalved-bDist
  }, {
    name: '#aob2',
    oX: mouseInitialLeft-aobWidthHalved + bDist,
    oY: mouseInitialTop-aobWidthHalved
  }];
  if (idx_of_selected_aob !== false) {
    if (calculateDistanceBetween(omniButton, {left: aobs[idx_of_selected_aob].oX, top: aobs[idx_of_selected_aob].oY}) < 100) {
      elementSpringTo(aobs[idx_of_selected_aob].name, omniButton.left + 5, omniButton.top + 5, [180, 8, 3]);
      // $(aobs[idx_of_selected_aob].name).css('top', omniButton.top + 5).css('left', omniButton.left + 5);
      return 0;
    } else {
      // $(aobs[idx_of_selected_aob].name).removeClass('hidden');
      elementSpringTo(aobs[idx_of_selected_aob].name, aobs[idx_of_selected_aob].oX, aobs[idx_of_selected_aob].oY, [140, 8, 3]);
      idx_of_selected_aob = false;
      console.clear();
			console.log('[reset] No aobs pulled');
      return 0;
    }
  } else {
		//console.clear(); console.log('> omniButton: ' +omniButton.top+ ', ' +omniButton.left);
    for (i in aobs) {//calcs distance of each [aobs Array] for every pixel dragged. crazy maths happening here.
      if (calculateDistanceBetween(omniButton, {left: aobs[i].oX, top: aobs[i].oY}) < 100) {
        idx_of_selected_aob = i;//idx of 'pulled' aob
				console.clear();
        console.log('pulled', aobs[i].name)
        elementSpringTo(aobs[i].name, omniButton.left + 5, omniButton.top + 5, [180, 8, 3]);
        //$(aobs[i].name).addClass('hidden');
        return 0;
      }
    }
  }
}
function calculateDistanceBetween(a, b) {
  var dX = Math.abs(a.left-b.left);
  var dY = Math.abs(a.top-b.top);
  var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
	//console.log(a, b);console.log('distance is', dX, dY, distance);
  return distance;
}