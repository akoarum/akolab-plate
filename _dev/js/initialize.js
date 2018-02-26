import Akolab from './core/Akolab';

const ua = navigator.userAgent;
const html = document.getElementsByTagName('html')[0];

// ===========================
// JS有効判定
// ===========================

html.classList.add('js-available');


// ===========================
// Ratina
// ===========================

if (window.devicePixelRatio > 1) {
  html.classList.add(`retina-${Math.round(window.devicePixelRatio)}`);
}


// ===========================
// UA判定
// ===========================

// iOS
if (ua.match(/iPhone|iPad|iPod/i)) {
  html.classList.add('ios');
  if (ua.match(/iPad/i)) {
    html.classList.add('ipad');
  }
} else if (ua.match(/Windows/i)) {
  html.classList.add('win');
  if (ua.match(/rv:11/i)) {
    html.classList.add('ie');
    html.classList.add('ie11');
  }
} else if (ua.match(/android/i)) {
  html.classList.add('android');
} else if (ua.match(/Macintosh/i)) {
  html.classList.add('mac');
}

if (ua.match(/MSIE/i)) {
  html.classList.add('ie');
  if (ua.match(/MSIE 10/i)) {
    html.classList.add('ie10');
  } else if (ua.match(/MSIE 9/i)) {
    html.classList.add('ie9');
  } else if (ua.match(/MSIE 8/i)) {
    html.classList.add('ie8');
  } else if (ua.match(/MSIE 7/i)) {
    html.classList.add('ie7');
  } else if (ua.match(/MSIE 6/i)) {
    html.classList.add('ie6');
  }
} else if (ua.match(/AppleWebkit/i) && ua.match(/Edge/i)) {
  html.classList.add('edge');
} else if (ua.match(/chrome/i)) {
  html.classList.add('chrome');
} else if (ua.match(/firefox/i)) {
  html.classList.add('firefox');
} else if (ua.match(/safari/i)) {
  html.classList.add('safari');
}


// ===========================
// Core JSの書き出し
// ===========================

window.sergeant = new Akolab();
