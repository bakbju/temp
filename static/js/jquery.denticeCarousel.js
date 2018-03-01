
/*
 $(오브젝트).accessibCarousel(옵션); //대상 오브젝트 선언, 옵션없어도 됨
 옵션 = {
 'auto' : 자동슬라이딩 여부 // 타입 = boolean, 기본값 = true
 'prevBtn' : 이전버튼 // 타입 = 오브젝트, 기본값 = false
 'nextBtn' : 이전버튼 // 타입 = 오브젝트, 기본값 = false
 'pager' : 번호기능 // 타입 = 오브젝트, 기본값 = false
 단! 메뉴가 없을 경우 자체 생성, 있을 경우 슬라이드 갯수와 동일해야함
 'oWid' : 슬라이드 가로사이즈 강제지정 // 타입 = 정수, 기본값 = 첫번째 슬라이드 가로길이
 'intV' : 딜레이속도 // 타입 = 정수, 기본값 = 3000
 'zIndex' : 슬라이드 개체의 z-index기본값 // 타입 = 정수, 기본값 = 100
 'slideSpeed' : 슬라이딩 속도 // 타입 = 정수, 기본값 = 'normal'
 'numVisible' : 현재 보이는 슬라이드 번호 표시 // 타입 = 오브젝트, 기본값 = false,
 'pagerClassName' : 활성화되는 번호에 부여되는 클래스명 // 기본값 = 'active'
 }

 */
(function ($) {
    $.fn.accessibCarousel = function (op) {
        op = $.extend({
            auto: true,
            intV: 5000,
            oWid: null,
            prevBtn: false,
            nextBtn: false,
            pager: false,
            pagerClassName: 'active',
            slideSpeed: 'normal',
            numVisible: false,
            zIndex: 11 // default z-index
        }, op || {});

        return this.each(function () {
            if($(this).length<0) return false;
            var Running = true;
            var This = $(this);
            var Active, Target
                , ActiveNum = 0
                , ActiveZindex = op.zIndex + 2
                , defaultZindex = op.zIndex + 1
                ;
            var Size = This.find('>*').size();
            var oWid = op.oWid ? op.oWid : This.find('>*:first').width();
            var Hei = This.find('>*:first').height();
            var intV;

//todo Ready
            function ready() {
                This.css({
                    'position':'relative',
                    'overflow' :'hidden'
                })
                This.find('>*').css({
                    'position':'absolute',
                    'top':0,
                    'left': 0,
                    'overflow' :'hidden'
                })
                This.find(':first').css('zIndex', ActiveZindex);
                Active = This.find(':first');
                if (op.pager) {
                    navRender();
                    navActive();
                    op.pager.show();
                }
                startRun()
            }

//todo ready to run
            function navRender() {
                if (op.pager.html() == '') {
                    This.find('>*').each(function (index) {
                        var Anchor = $('<a>' + (index + 1) + '</a>').click(function (e) {
                            e.preventDefault();
                            move(This.find('>*').eq($(this).index()));
                        }).attr({
                                href: "#ac" + (index + 1)
                            });
                        op.pager.append(Anchor)
                    })
                }
                else {
                    op.pager.delegate('a', 'click', function (e) {
                        e.preventDefault();
                        var aThis = (op.pager[0]!=$(this).parent(1)[0] ? $(this).parent(1) : $(this))
                        move(This.find('>*').eq(aThis.index()));
                    })
                }

                op.pager.find('a').bind('blur mouseleave', function () {
                    Running = true;
                    startRun()
                });
                op.pager.find('a').bind('focus mouseenter', function () {
                    Running = false;
                    stopRun()
                });
				op.pager.find('PlayStop').bind('click', function () {
                    Running = false;
                    stopRun()
                });
                navActive();
            }

            if (op.prevBtn) {
                op.prevBtn.bind('mouseleave blur', function () {
                    //Running = true;
                    //startRun()
                })
                op.prevBtn.bind('mouseenter focus', function () {
                    Running = false;
                    //stopRun()
                })
                op.prevBtn.bind('click', function () {
                    if(Size>1) move(Active.prev(':first'))
                });
            }
            if (op.nextBtn) {
                op.nextBtn.bind('mouseleave blur', function () {
                    Running = true;
                    //startRun()
                })
                op.nextBtn.bind('mouseenter focus', function () {
                    Running = false;
                    //stopRun()
                })
                op.nextBtn.bind('click', function () {
                    if(Size>1) move(Active.next(':first'))
                });
            }


            This.mouseenter(function () {
                Running = false;
            });
            This.mouseleave(function () {
                Running = true;
            });


            This.delegate('a', 'blur', function (e) {
                Running = true;
            })

            This.delegate('a', 'focus', function () {
                var Index = $(this).parents(This.children()[0].nodeName).index();
                move(This.find('>*').eq(Index));
                Running = false;

            })



            // todo run
            function startRun() {
                if (!op.auto || Size==1) return false;
                intV = setInterval(function () {
                    if (Running) run()
                }, op.intV);
            }

            function stopRun() {
                clearInterval(intV)
            }

            function move(Target) {
                var toWid = oWid;
                if (Active[0] == Target[0]) return false;
                if (Target.index() < 0) {
                    if (Active.index() == 0) {
                        Target = This.find('>*:last');
                        Target.css({'zIndex': ActiveZindex, 'left': -oWid});
                    }
                    if (Active.index() == (Size - 1)) {
                        Target = This.find('>*:first');
                        Target.css({'zIndex': ActiveZindex, 'left': oWid});
                        toWid = -oWid;
                    }
                }
                else {
                    if (Active.index() < Target.index()) {
                        Target.css({'zIndex': ActiveZindex, 'left': oWid});
                        toWid = -oWid;
                    }
                    else {
                        Target.css({'zIndex': ActiveZindex, 'left': -oWid});
                    }
                }

                Active.stop().animate({
                    'left': toWid
                }, op.slideSpeed, function () {
                    $(this).css({
                        'zIndex': defaultZindex,
                        'left': 0
                    });
                });
                Target.stop().animate({
                    'left': 0
                }, op.slideSpeed, function () {
                    $(this).css({
                        'zIndex': ActiveZindex,
                        'left': 0
                    });
                });
                Active = Target;
                ActiveNum = Target.index();
                navActive()
            }

            function navActive() {
                if (op.numVisible) op.numVisible.val(ActiveNum + 1)
                if (op.pager) {
                    op.pager.find('a').removeClass(op.pagerClassName);
                    op.pager.find('a').eq(ActiveNum).addClass(op.pagerClassName);
                }
            }

            function run() {
                move(Active.next(':first'));
                navActive()
                return false;
            }

            ready();
            //$(window).on('load', function(){

                Hei = This.find('img').eq(0).height()
                This.css('height', Hei);
                $(window).on('resize', function(){
                    Hei = This.find('img').eq(0).height()
                    This.css('height', Hei);
                })

            //})
        })
    }
})(jQuery);