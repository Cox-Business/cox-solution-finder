// --------------------------------
// Global Variables
var config = {
  "breakpoints" : {
  	"site" : {
  		"mobile" : 992,
  	},
  	"showroom" : {
  		"tablet" : 1024,
  		"touch" : 1920
  	}
  }
}


// --------------------------------
// Development Functions
function initDevelopment(){
	console.log('initDevelopment Called');
	// if(document.documentElement.clientWidth <= config.breakpoints.phone) {

	// }
}


// --------------------------------
// Global Functions
function initGlobal(){
	console.log('initGlobal Called');
	$('img').on('dragstart', function(event) { event.preventDefault(); });
	navigationModal();
	itemNavigation($('.product-navigation-item-container'), $('.product-container'));
}

/*  
	Standard Global Item Navigation within a view. (i.e. Product Navigation in Services)
	
	To use, set the argument `navigationItem` to the jQuery nav item to be clicked,
	and set the arguement `item` to the jQuery item that should appear.

	In the HTML set `data-navigationitem` and `data-item` as the same string.

	Both should use the active class to denote selection, with
	CSS creating any animations.
*/
function itemNavigation(navigationItem, item){
	navigationItem.on('click',function(){
		var keystone_id = $(this).data('navigationitem');
		var theItem = item.filter("[data-item='" + keystone_id + "']");
		$(this).addClass('active').siblings().removeClass('active');
		theItem.addClass('active').siblings().removeClass('active');
	});
}

function scrollTo(toBeScrolled, whereToScroll, time){
	if(typeof(time)==='undefined') time = 200;
	toBeScrolled.animate({
        scrollTop: whereToScroll
    }, time);
}


function navigationModal(){

	$('.navigation-item-list li.active').addClass('current');

	$('.navigation-modal-item').on('click',function(){

		$scope = {};
		$scope.$tiles = $('.navigation-modal-tiles');
		$scope.$glass = $('.the-looking-glass');
		$scope.glassActive = $scope.$glass.hasClass('active');
		$scope.$navItems = $('.navigation-modal-item');
		$scope.$navItem = $(this);
		$scope.$selector = $(this).data('navigation-modal-item');
		$scope.$target = $scope.$tiles.filter("[data-navigation-modal='" + $scope.$selector + "']");
		$scope.tilesActive = $scope.$tiles.hasClass('active');
		$scope.$allTiles = $('.navigation-modal-tile');
		$scope.$activePage = $('.navigation-item-list li.current');


		if(!$scope.$target.hasClass('active')){
			$scope.$glass.removeClass('active');
			$scope.$tiles.removeClass('active');
			$scope.$allTiles.removeClass('active');
			$scope.$navItems.removeClass('viewing');
			console.log('a');

			$scope.$glass.toggleClass('active');
			setTimeout(function(){
				$scope.$target.toggleClass('active');
				$scope.$target.find('.navigation-modal-tile').toggleClass('active');
				$scope.$navItem.toggleClass('viewing');
				$scope.$activePage.removeClass('active');
				console.log('b');
			},150);
		} else {
			setTimeout(function(){
				$scope.$target.find('.navigation-modal-tile').toggleClass('active');
				console.log('c');
			},0);
			setTimeout(function(){
				$scope.$glass.toggleClass('active');
				console.log('d');
			},150);
			$scope.$target.toggleClass('active');
			$scope.$navItem.toggleClass('viewing');
			$scope.$activePage.addClass('active');
			console.log('e');
		}
		
	
	});
	$('#body, .navigation-modal-tiles').not('.navigation-modal-tile').on('click', function(){
		$('.the-looking-glass, .navigation-modal-tiles, .navigation-modal-tile').removeClass('active');
	});
}




// --------------------------------
// Showroom Functions
function initShowroom(){
	console.log('initShowroom Called');
	sidebarNavigation();
	

	$('.product-showroom-scroll').on('click',function(){
		var parent = $(this).parent();
		var target = $(this);
		if(parent.hasClass('scrolled')){
			scrollTo(parent, 0, 1000);
			
			target.fadeOut('300', function(){
				parent.removeClass('scrolled');
				target.fadeIn('300');
			});
		} else {
			scrollTo(parent, parent.children('.row').last().offset().top, 1000);
			
			target.fadeOut('300', function(){
				parent.addClass('scrolled');
				target.fadeIn('300');
			});
		}
	});
}

// Tablet Sidebar Navigation
function sidebarNavigation(){
	$('.navigation-toggle').on('click', function(){
		$('#side-navigation').toggleClass('active');
	});
	$('#body').on('click', function(e){
		console.log(e.target);
		$('#side-navigation').removeClass('active');
	});
}

// --------------------------------
// Companion Site Functions
function initCompanion(){
	console.log('initCompanion Called');
	mobileNavigation();
	setMobileNavHeight();

}

// Tablet Sidebar Navigation
function mobileNavigation(){
	$('.navigation-toggle').on('click', function(){
		if($(this).hasClass('active')){
			$('.navigation-mobile-sub-menu').removeClass('active');
			$('.navigation-item.has-menu').removeClass('viewing');
			$('.navigation-mobile ul').children().removeClass('viewing').children().removeClass('active');
			$('.navigation-mobile ul').children().children('.navigation-mobile-sub-menu').slideUp();
			$('.navigation-mobile-body-background').removeClass('active');
			$('#body').show();
		} else {
			$('.navigation-mobile-body-background').addClass('active');
			$('#body').hide();
		}
		$(this).toggleClass('active');
		$('.navigation-mobile').toggleClass('active');

	});
	$('.navigation-item.has-menu').on('click', function(){
		$(this).parent().siblings().removeClass('viewing').children().removeClass('active');
		$(this).parent().siblings().children('.navigation-mobile-sub-menu').slideUp();
		$(this).parent().toggleClass('viewing');
		$(this).siblings('.navigation-mobile-sub-menu').slideToggle();
	})
	$('#body, .navigation-mobile-body-background').on('click', function(e){
		$('.navigation-mobile, .navigation-toggle, .navigation-mobile-sub-menu').removeClass('active');
		$('.navigation-item.has-menu').removeClass('viewing');
		$('.navigation-mobile ul').children().removeClass('viewing').children().removeClass('active');
		$('.navigation-mobile ul').children().children('.navigation-mobile-sub-menu').slideUp();
		$('.navigation-mobile-body-background').removeClass('active');
		$('#body').show();
	});
}


function setMobileNavHeight(){
	$('.navigation-mobile').css('max-height', document.documentElement.clientHeight - 50 + 'px');
}




// Functions for Window Resizing
$(window).resize(function(){
	if($('body').hasClass('showroom')){

	}
	if($('body').hasClass('companion-site')){
		if(document.documentElement.clientWidth <= config.breakpoints.site.mobile) {
			setMobileNavHeight();
		}
	}
		
	
});


$(function() {
	// --------------------------------
	// Inits
	initGlobal();
	if($('body').hasClass('showroom'))
		initShowroom();
	if($('body').hasClass('companion-site'))
		initCompanion();

	//Development Only
	initDevelopment();



});