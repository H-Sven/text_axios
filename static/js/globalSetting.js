
!function (n, e) {
    var docEl = n.documentElement,
        resizeEvt = 'orientationchange' in e ? 'orientationchange' : 'resize';
				window.recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
    if (!n.addEventListener) return;
    e.addEventListener(resizeEvt, window.recalc, false);
    n.addEventListener('DOMContentLoaded', window.recalc, false);
    window.recalc();

}(window.document, window);


