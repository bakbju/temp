(function ($) {
    $.fn.alterClass = function (removals, additions) {
        var self = this;
        if (removals.indexOf('*') === -1) {
            self.removeClass(removals);
            return !additions ? self : self.addClass(additions)
        }
        var patt = new RegExp('\\s' + removals.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
        self.each(function (i, it) {
            var cn = ' ' + it.className + ' ';
            while (patt.test(cn)) {
                cn = cn.replace(patt, ' ')
            }
            it.className = $.trim(cn)
        });
        return !additions ? self : self.addClass(additions)
    }
})(jQuery);
var Agent = self.navigator.userAgent;
var mobile = !!(Agent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || Agent.match(/LG|SAMSUNG|Samsung/) != null);
var tablet = !!(Agent.indexOf("Android") != -1 && (Agent.indexOf("Mobile") == -1 || Agent.indexOf("HTC Flyer") != -1));
(function () {
    if (window.cssReplace) return;
    cssReplace = {
        status: null, chkResolution: function () {
            var $body = $('body'), $intro = $('.mainBannerWrap'), $headWrap = $('.headWrap'),
                $content = $('#bottomMainWrap'), $footer = $('#footer');
            var className = 'goHome';
            var windowWidth = $(window).width();
            var sizeString = '';
            if (mobile && !tablet) {
                sizeString = 'Tiny'
            } else {
                if (windowWidth <= 820) {
                    sizeString = 'Tiny'
                } else if (windowWidth < 1024) {
                    sizeString = 'Medium'
                }
            }
            $body.alterClass(className + '*', className + sizeString);
            $intro.alterClass(className + '*', className + sizeString);
            $headWrap.alterClass(className + '*', className + sizeString);
            $content.alterClass(className + '*', className + sizeString);
            $footer.alterClass(className + '*', className + sizeString);
            cssReplace.status = sizeString;
            $('body').css('visibility', 'visible')
        }, setClass: function () {
            cssReplace.chkResolution()
        }, resetClass: function () {
            cssReplace.chkResolution()
        }
    }
})();
$(document).ready(function () {
    $(window).resize(function () {
        cssReplace.chkResolution()
    })
    cssReplace.chkResolution()
})