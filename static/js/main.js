document.createElement('footer');
document.createElement('section');
document.createElement('aside');
document.createElement('nav');
document.createElement('article');

$(function() {
    var activePage = null;
    var $gnbLi = $('#mainNav li');
    for (var i=0; $gnbLi.length>i; i++){
        if ($gnbLi.eq(i).is('.on')){
            activePage=i;
            activeMenu(activePage, cssReplace.status);
        }
    }
    function activeMenu(activePage, status){
        $gnbLi.eq(activePage).addClass('on');
        $gnbLi.eq(activePage).parents('li').addClass('on');
        if(status!='Tiny') {
            $gnbLi.eq(activePage).parents('div').not('.mainNavWrap').show();
            var pp = $gnbLi.eq(activePage).parents('.navStep1>li');
            gnbDepth2Position(pp);
        }
        $(window).resize(function(){
            gnbDepth2Position($gnbLi.eq(activePage).parents('.navStep1>li'));
        });
    }

    $gnbLi.bind('mouseenter', function() {
        if(cssReplace.status!='Tiny'&&cssReplace.status!='Medium'){
            $(this).addClass('on').siblings().removeClass('on').children('div').hide();
            $(this).siblings().find('li').removeClass('on');
            $(this).children('div').show();
            gnbDepth2Position($(this));
        }
    });
    $('#mainNav').bind('mouseleave',function(){
        if(cssReplace.status!='Tiny'&&cssReplace.status!='Medium'){
            $('.navStep1 li').removeClass('on');
            $('.navStep1 div').hide();
            activeMenu(activePage, cssReplace.status);
        }
    });
    $gnbLi.on('click', function(e){
        e.stopPropagation();
        if(cssReplace.status!='Tiny'&&cssReplace.status!='Medium'){
            if($(this).parents('li.firstMenu').length>0 && $(this).find('ul').length>0){
                return false;
            }
        }
    });

    var closeGnb = function(){
            $('.mainNavWrap').css({
                'height':'auto'
            });
            $('.bodyWrap').css({
                'height':'auto',
                'overflow':'hidden'
            });
            $('.goHomeTiny, .goHomeMedium').stop().animate({
                'left': '0'
            }, function(){
                $('.mainNavWrap').hide();
            });
            $('body').off( "click", closeGnb);
            return false;
    };

// 우측메뉴 롤링
    $('.menuBtn').on('click', function(){
        if($('.mainNavWrap').is(":hidden")) {
            $('.mainNavWrap').css({
                'height':'1280px'
            });
            $('.bodyWrap').css({
                'height':'1280px',
                'overflow':'hidden'
            });

            $('.mainNavWrap').show();
            $('.goHomeTiny, .goHomeMedium').not('body').stop().animate({
                'left': '540'
            },function(){
                $('body').on('click', function(e){
                    $target = $(e.target);
                    if(!$target.is('.mainNavWrap')) closeGnb();
                    else return false;
                });
            });

            $(window).resize(function(){
                if(cssReplace.status=='Tiny') return false;
                $('body, .mainBannerWrap, .headWrap, #bottomMainWrap, #footer').css('left','0');
                $('.mainNavWrap').show();
                $('.mainNavWrap').css({
                    'height':'auto'
                });
                $('.bodyWrap').css({
                    'height':'auto',
                    'overflow':'hidden'
                });
            });
        }
        else {
            $('.mainNavWrap').css({
                'height':'auto'
            });
            $('.bodyWrap').css({
                'height':'auto',
                'overflow':'hidden'
            });
            $('.goHomeTiny, .goHomeMedium').stop().animate({
                'left': '0'
            }, function(){
                $('.mainNavWrap').hide();
            });
        }
        return false;
    });

    $('.searchOpen').on('click', function(){
        $('.headWrap #mainHead').animate({
            'height':'160px'
        },100);
    });

    /* footer */
    $('.trigger').on('click',function(){
        $(this).next('.layer').slideDown('fast');
        $(this).next('.layer').find('.btnClose').on('click',function(){
            $(this).closest('.layer').slideUp('fast');
            return false;
        });
        return false;
    });

 });

$(document).ready(function(){
    var $blankA = $('._blank');
    for (var i=0; i<$blankA.length; i++)	{
        $blankA[i].onclick = function(){
            window.open(this.href);
            return false;
        };
    }
    $(window).on('load resize',function(){
        if($('.translucencyBg').length>0){
            $transBg = $('.translucencyBg');
            var hei = $('body').height();
            var wid = $('body').width();
            $transBg.width(wid).height(hei);
        }
    });
});




$(document).ready(function(){
		// [START] slide loop
		function loopGallery(obj, timer){
			var $speed = 500;
			var $wrapper = "#" + obj;

			function goNext(){
				//var $index = $(this).parents($wrapper).find(".tab").children("li.on").index();
				if(!$($wrapper).find(".on .clicked").is(":animated")){
					$($wrapper).find(".on .clicked").animate({
						left : $($wrapper).find(".on .clicked").position().left - $($wrapper).find(".on .clicked").children("li").width()
					},$speed,
					function(){
						$(this).children("li:first-child").appendTo($(this));
						$(this).css('left','0');
					});
				}
				return false;
			}
			$($wrapper).find(".links_next").click(goNext);

			function goPrev(){
				if(!$($wrapper).find(".on .clicked").is(":animated")){
					$($wrapper).find(".on .clicked").children("li:last-child").prependTo($($wrapper).find(".on .clicked"));
					$($wrapper).find(".on .clicked").css("left",$($wrapper).find(".on .clicked").children("li").width()*-1);
					$($wrapper).find(".on .clicked").animate({
						left : 0
					},$speed);
				}
				return false;
			}
			$($wrapper).find(".links_prev").click(goPrev);

			$($wrapper).find(".links_stop").click(function(){
				clearInterval(autoPlay);
			});
			$($wrapper).find(".links_play").click(function(){
				autoChange();
			});
		}

		if($("#recipeGallery").length>0){
			loopGallery("recipeGallery", 4000);
		}

		$("#recipeGallery .tab li a").on("click", function(){
			var $index = $(this).parent().index();
			$("#recipeGallery .tab li").removeClass("on");
			$(this).parent().addClass("on");

			$("#recipeGallery .inner").removeClass("on");
			$("#recipeGallery .inner:eq("+$index+")").addClass("on");
			return false;
		});

		// ȣ���Լ�(���̵�, ������)
		if($("#ParisDayGallery").length>0){
			loopGallery("ParisDayGallery", 4000);
		}
		// [END] slide loop

		$("#ParisDayGallery .tab li a").on("click", function(){
			var $index = $(this).parent().index();
			$("#ParisDayGallery .tab li").removeClass("on");
			$(this).parent().addClass("on");

			$("#ParisDayGallery .inner").removeClass("on");
			$("#ParisDayGallery .inner:eq("+$index+")").addClass("on");
			return false;
		});

		// ȣ���Լ�(���̵�, ������)
		if($("#productGallery").length>0){
			loopGallery("productGallery", 4000);

		}
		// [END] slide loop

		$("#productGallery .tab li a").on("click", function(){
			var $index = $(this).parent().index();
			$("#productGallery .tab li").removeClass("on");
			$(this).parent().addClass("on");

			$("#productGallery .inner").removeClass("on");
			$("#productGallery .inner:eq("+$index+")").addClass("on");

			return false;
		});

	});


