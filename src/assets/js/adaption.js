(function(doc, win) {
  isIE();
  // var docEl = doc.documentElement,
  //   resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  //   recalc = function() {
  //     var clientWidth = docEl.clientWidth > 750 ? 375 : docEl.clientWidth;
  //     if (!clientWidth) {
  //       return
  //     }
  //     docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
  //   };
  // if (docEl.clientHeight < 504) {
  //   docEl.style.height = 504 + 'px';
  // }
  // recalc();
  // if (!doc.addEventListener) return;
  // win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener('DOMContentLoaded', recalc, false);

  function isIE() {
    var userAgent = navigator.userAgent;
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var IEVersion = parseInt(RegExp["$1"]);
    if (IEVersion < 9) {
      alert('您的浏览器太老啦，请更新后再来吧~')
    }
  }

  win.onload = function() {
    var orderBtn = document.querySelector('#orderBtn');
    var closeBtn = document.querySelector('#closeBtn');
    var orderBox = document.querySelector('#orderBox');

    orderBtn.onclick = function() {
      orderBox.style.display = 'block';
    };

    closeBtn.onclick = function() {
      orderBox.style.display = 'none';
    };

    var form = document.querySelector('#form');
    if (form) {
      var inputs = form.querySelectorAll('input');
      var sendBtn = document.querySelector('#sendBtn');

      sendBtn.onclick = function() {
        sendBtn.setAttribute('disabled', 'disabled');
        var data = {};

        inputs.forEach(function(input) {
          data[input.name] = input.value;
        });

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var value = data[key];
            if (!value) {
              alert('信息填写不完整，请检查确认后重新发送');
              sendBtn.removeAttribute('disabled');
              return;
            }
          }
        }

        var xhr = new XMLHttpRequest();
        var url = 'http://116.62.196.72:8756/gunsApi/sendEmail';
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            var res = xhr.responseText;
            if (res.code == 2000) {
              alert('提交成功');
              sendBtn.removeAttribute('disabled');
            }
          }
        };
        xhr.send(JSON.stringify(data));
      };
    }
  };

})(document, window);