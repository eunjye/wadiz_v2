/**
 * Created by CJ Olive Networks on 2018-02-05.
 */

// HTML Element IE7, 8 인식;
document.createElement('header');
document.createElement('nav');
document.createElement('article');
document.createElement('section');
document.createElement('aside');
document.createElement('footer');

// ie css-hack
var ua = navigator.userAgent,
	doc = document.documentElement;
if ((ua.match(/MSIE 10.0/i))) {
	doc.className = doc.className + " ie10";
} else if((ua.match(/MSIE 9.0/i))) {
	doc.className = doc.className + " ie9";
} else if((ua.match(/MSIE 8.0/i))) {
	doc.className = doc.className + " ie8";
} else if((ua.match(/MSIE 7.0/i))) {
	doc.className = doc.className + " ie7";
} else if((ua.match(/rv:11.0/i))){
	doc.className = doc.className + " ie11";
}

// Definition Constant
var CBP = CBP || {};

/**
 * ----------------------------------------------------------------------------
 * # Sticky Header UI
 * ----------------------------------------------------------------------------
 */
CBP.headerUI = function () {
	
	var $header = $('#header'),
		initTop = 0,
		$window = $(window),
		$container = $('.container');

	if (!$container.length) {
		$header.addClass('isBg');
	} else {
		$header.addClass('chk-top');
		$window.on('scroll', function () {
			var nowTop = $window.scrollTop();

			if (!!$container.length) {
				if (nowTop > initTop) {
					$header.addClass('isBg').removeClass('chk-top');
					$header.removeClass('chk-top');
				} else if (nowTop <= initTop) {
					$header.removeClass('isBg').addClass('chk-top');
					$header.addClass('chk-top');
				}
			}
		});
		/*$header.on('mouseenter mouseleave', function (e) {
			var $target = $(this);
			if ($target.is('.chk-top')) {
				if (e.type == 'mouseenter') {
					$target.addClass('isBg');
				} else {
					if (!$('.login-area').is('.showing')) {
						$target.removeClass('isBg');
					}
				}
			}

		});*/

	}

};


/**
 * ----------------------------------------------------------------------------
 * # GNB UI
 * ----------------------------------------------------------------------------
 */
CBP.gnb = function () {
	var $header = $('#header'),
		$navWrap = $('.nav-wrap'),
		$nav = $('.nav-area'),
		$anchor = $nav.find('.nav-menu a'),
		$mContainer = $('.m-container'),
		// bgClass = 'isBg',
		opened = 'opened';

	$nav.on('mouseenter mouseleave', function (e) {
		e.preventDefault();
		if (e.type === 'mouseenter') {
			if (!!$mContainer.length) {
				$header.addClass('isBg02');
			}
			$navWrap.addClass(opened);
		} else {
			if (!!$mContainer.length) {
				$header.removeClass('isBg02');
			}
			$navWrap.removeClass(opened);
		}

	});
	$anchor.on('focus blur', function (e) {
		e.preventDefault();
		if (e.type === 'focus') {
			// $header.addClass(bgClass);
			$navWrap.addClass(opened);
		} else {
			$navWrap.removeClass(opened);
		}
	});

};


/**
 * ----------------------------------------------------------------------------
 * # jquery UI datepicker
 * ----------------------------------------------------------------------------
 */
$.fn.initDatepicker = function () {
	var target = $(this);
	target.find('input').each(function () {
		if ($(this).hasClass('datepicker') == true) {
			$(this).datepicker({
				showOn: "button",
				buttonText: "날짜 선택",
				buttonClass: "find_date",
				dateFormat: "yy-mm-dd",
				dayNames: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
				monthNames: ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"],
				monthNamesShort: ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"],
				prevText: "이전달",
				nextText: "다음달",
				showOtherMonths: true,
				showMonthAfterYear: true,
				changeMonth: true,
				changeYear:true,

				beforeShowDay: function (day, year) {
					var result;
					switch (day.getDay()) {
						case 0: // 일요일?
							result = [true, "ui-date-sunday"];
							break;
						case 6: // 토요일?
							result = [true, "ui-date-saturday"];
							break;
						default:
							result = [true, ""];
							break;
					}
					return result;
				}
			});
			$('.ui-datepicker-calendar > thead td.ui-datepicker-week-end:last-child a').addClass('ui-date-saturday');

			$(this).on('mousedown', function () {
				$(this).next('.ui-datepicker-trigger').click();
				return false;
			});
		}
	});
};



/**
 * ----------------------------------------------------------------------------
 * # Upload file UI
 * ----------------------------------------------------------------------------
 */
CBP.uploadFile = function () {

	if (!$('.input-file').length) return;

	// var $fileBtn = $('.input-file .file-label');

	$(document).on('click', '.input-file .file-label', function (e) {
		var $this = $(this),
			originFile = $this.prev('.file-upload'),
			fileName = $this.prevAll('.file-name');

		originFile.on('change', function () {
			var target = $(this),
				fileValue = target.val();
			fileName.val(fileValue);
		});
		originFile.trigger('click');
		e.preventDefault();
	});
};

/**
 * ----------------------------------------------------------------------------
 * # 좋아요 버튼
 * ----------------------------------------------------------------------------
 */
CBP.toggleBtn = function () {
	if (!$('.btn-like').length) return;

	var $buttons = $('.btn-like');
	$buttons.one('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		$this.addClass('is-selected');
	});

};


/**
 * ----------------------------------------------------------------------------
 * # Main Key Visual (Bx-slider Plug-in)
 * ----------------------------------------------------------------------------
 */
CBP.keyVisual = function () {

	if (!$('.main-slider').length) return;

	var $keyVisual = $('.main-slider');
	var mainVisual =   $keyVisual.bxSlider({
		mode: 'fade',
		pager: true,
		auto: true,
		stopAutoOnClick: false,
		autoControls: false, // 재생,정지
		moveSlides : 1,
		minSlides: 1,
		maxSlides: 10,
		slideMargin: 0,
		speed: 800, // fade speed
		pause: 5000, // interval
		infiniteLoop: true,
		keyboardEnabled : true,
		onSliderLoad: function(){
			$('.bx-pager').wrap('<div class="control-wrap"></div>');
			$('.control-wrap').append($('.bx-controls-auto'));
			$('.main-slider .ms-item').eq(0).addClass('current');
		},
		onSlideAfter : function (crrIdx, total, crrObj) {
			$('.current').removeClass('current');
			$('.main-slider .ms-item').eq(crrObj).addClass('current');
			mainVisual.startAuto();
		}
	});
};

/**
 * ----------------------------------------------------------------------------
 * # Main Side Banner (Bx-slider Plug-in)
 * ----------------------------------------------------------------------------
 */
CBP.sideBanner = function () {

	if (!$('.side-slider').length) return;

	var $sideSlide = $('.side-slider');
	var sideBanner =   $sideSlide.bxSlider({
		mode: 'fade',
		auto: true,
		pager: true,
		controls: false,
		onSliderLoad: function(){
			var pager = ($sideSlide.find('.side-item').length <= 1);
			if (pager) {
				$( '.staff .bx-controls' ).remove();
			}
		},
		onSlideAfter: function () {
			sideBanner.startAuto();
		}
	});
};

/**
 * ----------------------------------------------------------------------------
 * # Main Side Banner (Bx-slider Plug-in)
 * ----------------------------------------------------------------------------
 */
CBP.noticeSlide = function () {

	if (!$('.notice-slide').length) return;

	var $noticeSlide = $('.notice-slide');
	var noticeSlider =   $noticeSlide.bxSlider({
		auto: false,
		pager:false,
		controls: true,
		slideWidth: 167,
		minSlides: 3,
		maxSlides: 10,
		slideMargin: 10,
		infiniteLoop: false,
		moveSlides : 1,
		onSlideAfter: function () {
			// noticeSlider.startAuto();
		}
	});
};

/**
 * ----------------------------------------------------------------------------
 * # To check text length
 * ----------------------------------------------------------------------------
 */
CBP.checkChar = function () {

	if (!$('.check-char').length) return;

	$('.check-char').each(function(){
		var $max = $('.max', this);
		var $inputCheck = $(".check-input", this);
		var $counting = $(".counting", this);
		var maximumCount = $max.text() * 1;
		var update = function(){
			var before = $counting.text() * 1;
			var now = $inputCheck.val().length;

			// 사용자가 입력한 값이 제한 값을 초과하는지를 검사한다.
			if (now > maximumCount) {
				var str = $inputCheck.val();
				$(".check-input", this).focus();
				var inputVal = str.substr(0, maximumCount);
				alert(maximumCount + '자를 초과하였습니다.');
				now = maximumCount;
				console.log( now );
				$inputCheck.val(inputVal);
			}

			// 필요한 경우 DOM을 수정한다.
			if (before != now) {
				$counting.text(now);
			}
		};
		$inputCheck.bind('input keyup paste', function(){
			setTimeout(update, 0);
		});
		update();

	});
};



/**
 * ----------------------------------------------------------------------------
 * # Tab Menu
 * ----------------------------------------------------------------------------
 */
CBP.tabList = function () {

	function TabList(selector, activeClass) {
		if (!(this instanceof TabList)) {
			return new TabList();
		}
		this.$selector = $(selector);
		this.dataValue = selector.substring(1, selector.length);
		this.isSelected = activeClass;
		this._initialize();
	}

	TabList.prototype = {
		_initialize : function () {
			this.$tabContents = $('[data-tabContent="' + this.dataValue + '"]');
			this.$tabItems = this.$selector.find('li');
			this.$tabContents.eq(0).show();

			this._addEvent();
		},
		_addEvent : function () {
			// this.$tabItems.on('click', 'a', this._setUp.bind(this));
			this.$tabItems.on('click', 'a', $.proxy(this._setUp, this ));
		},
		_setUp : function (e) {
			e.preventDefault();
			var $targetItem = $(e.target).closest('li');
			this.contsIndex = $targetItem.index();

			$targetItem.addClass(this.isSelected).siblings().removeClass(this.isSelected);

			this._contShow();
		},
		_contShow : function () {
			this.$tabContents.hide().eq(this.contsIndex).show();
		}
	};

	return TabList;
}();

/**
 * ----------------------------------------------------------------------------
 * # Accordion Menu
 * ----------------------------------------------------------------------------
 */
CBP.accordion = function (speed) {

	var $accWrap    = $('.acc-list'),
		$accItems   = $accWrap.find('li'),
		speed       = speed || 300;

	$accItems.on('click', 'a', controller);

	function controller(e) {
		var $target      = $(e.target),
			$targetItem  = $target.closest('li'),
			$targetChild = $target.next(),
			$siblings    = $targetItem.siblings();

		$siblings.removeClass('active');
		$siblings.find('.acc-a').slideUp(speed);

		$targetChild.is(':hidden') ?
			open($targetItem, $targetChild) : close($targetItem, $targetChild);
		return false;
	}

	function open(item, child) {
		item.addClass('active');
		child.slideDown(speed);
	}

	function close(item, child) {
		item.removeClass('active');
		child.slideUp(speed);
	}
};


/**
 * ----------------------------------------------------------------------------
 * # combo toggle
 * ----------------------------------------------------------------------------
 */
CBP.comboToggle = function () {
	if (!$('.combo-area').length) return;

	var $comboWrap = $('.combo-area');
	var $btnCombo = $('.btn-combo01');
	var $comboBox = $comboWrap.find('.combo-box');
	var $closeCombo = $comboWrap.find('.btn-close01');

	$btnCombo.on('click', function (e) {
		var $this = $(this);
		$comboBox.show();
	});

	$closeCombo.on('click', function () {
		$comboBox.hide();
	});
};

/**
 * ----------------------------------------------------------------------------
 * # evaluate idea(별점주기)
 * ----------------------------------------------------------------------------
 */
CBP.star = function () {
	if (!$('.star-rating').length) return;

	var starBox = $('.star-rating'),
		star = 'a.star';

	starBox.one('click', star, function () {
		var $this = $(this);

		$this.parent().children(star).removeClass('on');
		$this.addClass('on').prevAll('a').addClass('on');
	});

};

/**
 * ----------------------------------------------------------------------------
 * # side menu
 * ----------------------------------------------------------------------------
 */
CBP.sideMenu = function () {
	if (!$('#side-menu').length) return;

	var $btnOpen = $('.btn-side-open'),
	 	$btnClose = $('.btn-side-close'),
		$layerContent = $('#side-menu');

	$btnOpen.on( 'click', function () {
		$layerContent.fadeIn();
	});
	$btnClose.on( 'click', function () {
		$layerContent.fadeOut();
	} );

};

/**
 * ----------------------------------------------------------------------------
 * # tooltip layer-popup
 * ----------------------------------------------------------------------------
 */
CBP.tooltip = function () {
	if (!$('.tooltip-layer').length) return;

	var $openTooltip = $('[data-tooltip="tooltip"]'),
		$closeTooltip = $('.tooltip-close'),
		$tooltipLayer = $('.tooltip-layer');

	$openTooltip.on( 'click', function () {
		$tooltipLayer.fadeIn();
	});
	$closeTooltip.on( 'click', function () {
		$tooltipLayer.fadeOut();
	} );

};


/**
 * ----------------------------------------------------------------------------
 * # layer popup
 * ----------------------------------------------------------------------------
 */
CBP.layerPopup = function () {
	if (!$('.layer-wrap').length) return;

	var $btnLayerOpen = '[data-popup-button="btn-popup"]';

	$(document).on( 'click', $btnLayerOpen, function () {
		var _self = $(this),
			layerContent =  $(_self.attr('href')),
			$btnClose = layerContent.find('.layer-close');

		layerContent.fadeIn();
		$btnClose.on( 'click', function () {
			layerContent.fadeOut();
		} );
		return false;
	} );
};
CBP.actionPlanPopup = function () {
	if (!$('.layer-wrap').length) return;

	var $btnLayerOpen = '[data-popup-button="action-popup"]';
	// var checked = false;
	$(document).on( 'click', $btnLayerOpen, function () {
		var _self = $(this),
			layerContent =  $(_self.attr('href')),
			$btnClose = layerContent.find('.layer-close');
		layerContent.show();

		/*if (!checked) {

		}
		checked = true;*/
		$btnClose.on( 'click', function () {
			layerContent.hide();
		} );
		return false;
	} );
};


/**
 * ----------------------------------------------------------------------------
 * # 과제정의서 더보기
 * ----------------------------------------------------------------------------
 */
CBP.moreContents = function () {
	if (!$('.more-td-content').length) return;

	var $moreCont = $('.more-td-content');
	var $btnMore = $('.btn-more-cmt');

	$btnMore.on( 'click', function () {
		var _self = $(this);

		$moreCont.toggle();
		_self.toggleClass('is-opened');
		if (!!_self.is('.is-opened')) {
			_self.text('과제정의서 닫기')
		} else {
			_self.text('과제정의서 더보기')
		}
	} );
};




/**
 * ----------------------------------------------------------------------------
 * # Init document ready
 * ----------------------------------------------------------------------------
 */
$(function () {
	CBP.headerUI();
	CBP.gnb();
	CBP.toggleBtn();
	CBP.keyVisual();
	CBP.sideBanner();
	CBP.noticeSlide();
	CBP.checkChar();
	CBP.comboToggle();
	CBP.uploadFile();
	CBP.sideMenu();
	CBP.tooltip();
	CBP.layerPopup();
	CBP.actionPlanPopup();
	CBP.moreContents();

	CBP.star();
	$(document).initDatepicker();

	// Tab Menu UI
	var CbpTab = CBP.tabList;
	if (!!$('.tbl-tab-area').length) {
		var st01 = new CbpTab('#table-tab', 'is-selected');
	}
	if (!!$('.intro').length) {
		var st02 = new CbpTab('#tab-intro', 'active');
	}


	function banner() {

		if (!$('.oi-slide').length) {
			return;
		}

		var $oiSlide = $('.oi-slide');
		var oiBanner =   $oiSlide.bxSlider({
			controls: ($(".oi-slide li").length > 3) ? true: false,
			autoControls: false,
			slideWidth: 320,
			auto:false,
			minSlides: 3,
			maxSlides: 10,
			slideMargin: 10,
			infiniteLoop: false,
			moveSlides : 1,
			pager:false,
			keyboardEnabled : true,
			onSliderLoad: function(){
				$('.bx-next').attr('tabindex', '0');
				$('.bx-prev').attr('tabindex', '0');
			},
		});

		}
	banner();


});

