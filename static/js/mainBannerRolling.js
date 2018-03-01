$(document).ready(function () {
    $('#banner_franchising').accessibCarousel({
        pager: $('.guidePager'),
        auto: false
    });

    function introAction() {
        var $Intro = $('#mainBanner');
        var $IntroImg = $('#mainBanner .mainBannerImage');
        var minWidth = 640;
        var minHeight = 500;
        var $Window = {
            w: $(window).width(),
            h: $(window).height()
        };
        var $HeaderHeight = $('.headWrap').height();
        var viewport = {
            h: $Window.h - $HeaderHeight,
            w: $Window.w
        };

        $IntroImg.width('100%')
        if (cssReplace.status == 'SSize') {
            $IntroImg.height('auto').css('margin', 0);
            $Intro.height($IntroImg.height());
            $('.introWrap').height($IntroImg.height());
            return false;
        }
        if (viewport.w >= 1600) {
            if (viewport.h >= $IntroImg.height()) {
                $IntroImg.height(viewport.h);
                $Intro.height(viewport.h);
                $('.introWrap').height(viewport.h);
                $IntroImg.width('auto');
                $IntroImg.css({
                    'margin-top': 0,
                    'margin-left': -(($IntroImg.width() - $Window.w) / 2)
                });
            }
            else {
                $IntroImg.height('auto');
                $IntroImg.css({
                    'margin-top': -(($IntroImg.height() - $Window.h + $HeaderHeight) / 2),
                    'margin-left': 0
                });
                $Intro.height(viewport.h);
                $('.introWrap').height(viewport.h);
                document.title = 6;

                if (viewport.h < minHeight) {
                    $IntroImg.height('auto').css({
                        'margin': 0
                    });
                    $Intro.height($IntroImg.height());
                    $('.introWrap').height($IntroImg.height());
                }
            }
            return false;
        }
        if (viewport.h >= minHeight) {
            if ($IntroImg.height() >= viewport.h) {
                $IntroImg.height(viewport.h);
                $Intro.height(viewport.h);
                $('.introWrap').height(viewport.h);
                $IntroImg.width('auto')

                if ($IntroImg.width() <= viewport.w) {
                    $IntroImg.width('auto');
                    $IntroImg.height('auto');
                    $IntroImg.css({
                        'margin-top': -(($IntroImg.height() - $Window.h + $HeaderHeight) / 2),
                        'margin-left': -(($IntroImg.width() - $Window.w) / 2)
                    });
                }
                else {
                    $IntroImg.height(viewport.h);
                    $Intro.height(viewport.h);
                    $('.introWrap').height(viewport.h);
                    $IntroImg.width('auto');
                    $IntroImg.css({
                        'margin-top': 0,
                        'margin-left': -(($IntroImg.width() - $Window.w) / 2)
                    });
                }
            }
            else {
                $IntroImg.height(viewport.h);
                $Intro.height(viewport.h);
                $('.introWrap').height(viewport.h);
                $IntroImg.width('auto')
                $IntroImg.css({
                    'margin-left': -(($IntroImg.width() - $Window.w) / 2),
                    'margin-top': 0
                });
            }
        }
        else {
            $IntroImg.height('auto').css({
                'margin': 0
            });
            $Intro.height($IntroImg.height());
            $('.introWrap').height($IntroImg.height());
            /*document.title = 4;*/
        }
    }
});
$('#mainBanner').accessibCarousel({
    prevBtn: $('.btnLeftRolling'),
    nextBtn: $('.btnRightRolling'),
    auto: $('.PlayStop')
})
$(window).on('load resize', function () {
    $('.introTxt').each(function () {
        $(this).css({
            'top': '50%',
            'left': '50%',
            'margin-left': -($(this).width() / 2),
            'margin-top': -($(this).height() / 2)
        })
    });
});