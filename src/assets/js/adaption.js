(function(doc, win) {
  isIE();
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth > 750 ? 375 : docEl.clientWidth;
      if (!clientWidth) {
        return
      }
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
  if (docEl.clientHeight < 504) {
    docEl.style.height = 504 + 'px';
  }
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

  function isIE() {
    var userAgent = navigator.userAgent;
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var IEVersion = parseInt(RegExp["$1"]);
    if (IEVersion < 9) {
      alert('您的浏览器太老啦，请更新后再来吧~')
    }
  }
})(document, window);