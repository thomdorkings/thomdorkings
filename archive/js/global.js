/*
	Author:
	Thom Dorkings
	(thomdorkings.com)
*/


//AJAX LOADING ------------------------------------------------------------

	//AJAX page switching
	function linkPage(state) {
		location.hash = "/"+state;
		loadPage("/"+state);
		};
	
	//AJAX page load
	function loadPage(state) {
		
		if (state == '' || state == '#') {
			
			//$('#outer').animate({'scrollTop':0},300);
    		$('body').removeClass('hasProject hasTransitioned');
    	
	    } else {
	    
			var url = state.substring(1)+".html";
			
			$('body').addClass('transitioning');
			
			$('#project').load(url, function() {
				
				$('#outer').animate({'scrollTop':0},0);
				$('body').removeClass('transitioning');
				$('body').addClass('hasProject');
				
				setTimeout(function() {
					$('body').addClass('hasTransitioned');
					}, 1200);
				
				});
				
			}
					
		};


//DOM-READY EVENT ------------------------------------------------------------

$(document).ready(function() {

	//CHECK HASH ---------------------------
	
	urlhash = location.hash.substring(1);
	
    if (urlhash == '') {
    	$('body').removeClass('hasProject');
	    } else {
	    loadPage(urlhash);
	    };
	
	//Bind a handler for hash/state changes
    $.History.bind(function(state){
    	loadPage(state);
		});
			
	
	//VIEWPORT SIZING ---------------------------
	
	viewportWidth	=	$(window).width(); // gets the viewport width
	viewportHeight	=	$(window).height();// gets the viewport height
	
	if(viewportWidth > 768) {
		var tileHeight =  2;
	} else if(480 < viewportWidth && viewportWidth < 768) {
		var tileHeight =  3.5;
	} else if(viewportWidth < 480) {
		var tileHeight =  2.5;
	}
	
	var tilePadding = Number( $('#container').css('padding-top').slice(0, -2) );
	$('#tiles li').height( Math.floor( (viewportHeight - (tilePadding*2)) / tileHeight ) );
		
	
	//DETECT TOUCH DEVICES ------------------------------------------------------------
	
	if (navigator.userAgent.indexOf('Android') >= 0 ||
      	navigator.userAgent.indexOf('iPhone') >= 0 ||
      	navigator.userAgent.indexOf('iPad') >= 0 ||
      	navigator.userAgent.indexOf('iPod') >= 0) {
			$('body').addClass('hasTouch');
			$('body').on('touchstart', function(e) {
				moved = false;
				touchStartX = event.touches[0].pageX;
				touchStartY = event.touches[0].pageY;
				});
			$('body').on('touchmove', function(e) {
			    //if finger moves more than 20px set moved to true
			    if (Math.abs(event.touches[0].pageX - touchStartX) > 20 ||
			        Math.abs(event.touches[0].pageY - touchStartY) > 20) {
			            moved = true;
						};
				});
	    };
	 
	 $('#tiles li.tile').hover(function() {
		//$('#t').toggleClass('faded');
	 	});
	 	
	 $('#info_btn').on('click', function() {
		$('body').toggleClass('hasInfo');
		
		$('#container').on('click', function() {
			$('body').removeClass('hasInfo');
			$('#container').off('click');
			return false;
			});
			
		return false;
		
	 	});
	    
	
});


$(window).load(function() {

	setTimeout(function() {
		$('body').removeClass('loading');
		
		setTimeout(function() {
			$("#tiles li.tile").each(function(i) {
		
				var $tile = $(this);
				
				setTimeout(function() {
					$tile.removeClass('loading');
					}, (i+1)*150);
					
				});
			}, 300);
		
		}, 100);
	  
	  
});


//WINDOW RESIZE EVENT ---------------------------
	
$(window).resize(function() {
		
		viewportWidth	=	$(window).width(); // updates the viewport width
		viewportHeight	=	$(window).height();// updates the viewport height
		
		if(viewportWidth > 768) {
			var tileHeight =  2;
		} else if(480 < viewportWidth && viewportWidth < 768) {
			var tileHeight =  3.5;
		} else if(viewportWidth < 480) {
			var tileHeight =  2.5;
		}
		
		var tilePadding = Number( $('#container').css('padding-top').slice(0, -2) );
		$('#tiles li').height( Math.floor( (viewportHeight - (tilePadding*2)) / tileHeight ) );
		
});
		

//SCROLL EVENT ------------------------------------------------------------
	
$(window).scroll(function() {

    scrollPosition = $(window).scrollTop();

	
});