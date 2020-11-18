/**
 * Created on 2020-04-01
 */

// Definition Constant
var WD = WD || {}; // WaDiz

WD.fullPageUi = function() {
	if (!$('.main').length) return;

	var wadizFullpage = new fullpage('#wadiz-page', {
		verticalCentered: false,
		anchors: ['anchor1', 'anchor2', 'anchor3'],
		menu: '#fp-menu',
	});

	var fpMenuEl = $('#fp-menu .fp-menu-item');
	var fpMenuLastEl = $('#fp-menu .fp-menu-item:last-child');
	var fpMenuSecondEl = $('#fp-menu .fp-menu-item:nth-child(2)');
	var iconScrollEl = $('.icon-scroll');
	var fpMenuBox = $('.fb-menu-box');
	var nextViewEl = $('.next-view');

	$(window).on('mousewheel touchmove', function(e){
		if (!fpMenuEl.is('.active')) {
			fpMenuBox.addClass( 'off' );
			iconScrollEl.addClass( 'off' );
		} else {
			fpMenuBox.removeClass( 'off' );
			iconScrollEl.removeClass( 'off' );
		}
		if (fpMenuLastEl.is('.active')) {
			nextViewEl.removeClass( 'off' );
		} else {
			nextViewEl.addClass( 'off' );
		}
	});

	var section4 = $( '#section4' ).clone();
	var winEl = $( window );
	var htmlEl = $( 'html' );

	winEl.on('resize load', function(evt) {
		var breakPoint = $( '#wadiz-page' ).width() < 768;
		if (evt.type === 'resize') {
			if (breakPoint) {
				$( '#section4' ).remove();
			} else {
				section4.insertAfter($( '#section3' ));
			}
		}
		if (evt.type === 'load') {
			if (breakPoint) {
				$( '#section4' ).remove();
			}
		}
	});
};

WD.mainUi = function() {
	var main = $('.main');
	if (!!main.length) {
		var $btnTop = $('.btn-move-top');
		var section5 = $('#section5');
		var section6 = $('#section6');
		$(window).on('mousewheel touchmove', function () {
			var fpSection = $('.fp-section:first-child');

			if (fpSection.is('.active')) {
				$btnTop.fadeOut( 200 );
			} else {
				$btnTop.fadeIn( 200 );
				$btnTop.on('click', function () {
					fullpage_api.moveTo('anchor1', 2);
					$btnTop.fadeOut( 200 );
				})
			}
			if (section5.is('.active') || section6.is('.active')) {
				$( '#header' ).addClass( 'isBg' );
			} else {
				$( '#header' ).removeClass( 'isBg' );
			}

		});
	}
};

WD.ctrlMenu = function() {
	var headerEl = $('#header');
	var headerH = headerEl.hasClass('v2') ? {max: 156, min: 70} : {max: 176, min: 90};
	function desktopMenu() {
		$('#desktopMenu .main-menu-wrap').on('mouseenter mouseleave', function (e) {
			if (e.type === 'mouseenter') {
				headerEl.css({
					height: headerH.max
				});
			} else if (e.type === 'mouseleave') {
				headerEl.css({
					height: headerH.min
				});
			}
		});
	}
	!headerEl.hasClass('v2') && desktopMenu();

	function mobileMenu() {
		$(".btn-hamburger").on('click', function(e){
			e.preventDefault();
			if ( !$(this).is('.open')) {
				$(this).addClass('open');
				headerEl.addClass( 'opened' );
			} else {
				$(this).removeClass('open');
				headerEl.removeClass( 'opened' );
			}

		});
		var mobileMenu = $( '#mobileMenu' );
		if (!$('#header').hasClass('v2')) { 
			mobileMenu.on('click', '.link-1depth', function (e) {
				e.preventDefault();
				var parentEl =  $( this ).parent();
				var selectStr = 'is-selected';
				var mmSubBoxStr = '.mm-sub-box';
				mobileMenu.find( mmSubBoxStr ).slideUp();

				if ( !$( this ).parent().is( '.is-selected' )) {
					parentEl.addClass(selectStr).find( mmSubBoxStr ).slideDown();
					parentEl.siblings().removeClass(selectStr);
				} else {
					parentEl.addClass(selectStr).find( mmSubBoxStr ).slideUp();
					parentEl.removeClass(selectStr);
				}

			});
		}
	}
	mobileMenu();
};

WD.ctrlBg = function () {

	var $header = $('#header'),
		initTop = 0,
		$window = $(window),
		$mContainer = $('.m-container');

	if (!$('.main').length) {
		if (!!$header.hasClass('v2')) { return false; }
		$window.on('scroll', function () {
			var nowTop = $window.scrollTop();

				if (nowTop > initTop) {
					$header.addClass('isBg')
				} else if (nowTop <= initTop) {
					$header.removeClass('isBg')

				}
		});

	}

};

WD.subPageMoveTop = function() {
	if ($('.main').length) return;

	var $moveTop = $('.btn-move-top');
	var prevOffset = 0;
	$(window).on('scroll', function () {
		var currentOffset = window.pageYOffset;
		if (currentOffset >= 150) {
			$moveTop.fadeIn(200);

		} else if (currentOffset <= 200) {
			$moveTop.fadeOut(200);

		}
		prevOffset = currentOffset
	});
	$moveTop.on('click', function () {
		$('html, body').animate({scrollTop: 0}, 200);
		return false;
	});

};

WD.callLayer = function () {
	var btnLayer = document.querySelectorAll('[data-layer]');
	for (var i = 0; i < btnLayer.length; i++) {
		btnLayer[i].addEventListener( 'click', function (e) {
			var targetId = this.dataset.layer;
			var targetLayer = document.querySelector('#' + targetId );
			targetLayer.classList.add( 'showing' );
		} );
	}

	var btnLayerClose = document.querySelectorAll('.layer_section .btn_layer-close');
	for (var i = 0; i < btnLayerClose.length; i++) {
		btnLayerClose[i].addEventListener('click', function (e) {
			var targetElem = e.target;
			while (!targetElem.classList.contains('layer_section')) {
				targetElem = targetElem.parentNode;
				if (targetElem.nodeName == 'BODY') {
					targetElem = null;
					return;
				}
			}
			targetElem.classList.remove( 'showing' );

		})
	}
};


/**
 * ----------------------------------------------------------------------------
 * # Init document ready
 * ----------------------------------------------------------------------------
 */
$(function () {

	WD.fullPageUi();
	WD.mainUi();
	WD.ctrlMenu();
	WD.ctrlBg();
	WD.subPageMoveTop();
	WD.callLayer();

	var owlSlide = $('#latest-list');
	if (!!owlSlide.length) {
		var owl = owlSlide.owlCarousel({
			loop:false,
			nav:true,
			slideBy :3,
			responsive:{
				0:{
					items:2,
					margin:15,
				},
				769:{
					items:3,
					margin:35,
				}
			},
			// onChange: callback,
		});
	}
});

