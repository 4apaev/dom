'use strict';

module.exports = (axis, el=this) => {

  let x, y, w, h, hand, fn = axis ? axis==='h' ? hresize : vresize : resize;
  const doc = document.documentElement;

  stop();

  if (hand = el.querySelector('.resizer')) {
    hand.removeEventListener('mousedown', drag, false)
    el.removeChild(hand);
  }

  el.classList.add('resizable');
  hand = document.createElement('div');
  hand.className = 'resizer';
  el.appendChild(hand);
  hand.addEventListener('mousedown', drag, false);

  function drag(e) {
     x = e.clientX;
     y = e.clientY;

     let { width, height } = document.defaultView.getComputedStyle(el)

     w = parseInt(width, 10)
     h = parseInt(height, 10)
     doc.addEventListener('mousemove', fn, false);
     doc.addEventListener('mouseup', stop, false);
  }

  function resize(e) {
      hresize(e);
        vresize(e);
    }

  function hresize(e) {
      el.style.width  = (w + e.clientX - x) + 'px';
    }
  function vresize(e) {
      el.style.height = (h + e.clientY - y) + 'px';
    }

  function stop(e) {
      el.classList.remove('resizable');
      doc.removeEventListener('mousemove', fn, false);
      doc.removeEventListener('mouseup', stop, false);
    }

  return el;
}