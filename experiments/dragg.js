'use strict';
module.exports = dragg;

function dragg(axis, el=this) {

  let w, h, hand, fn = axis ? axis==='x' ? movex : movey: move;
  const doc = document.documentElement;

  stop();

  if (hand = el.querySelector('.dragger')) {
      hand.removeEventListener('mousedown', drag, false);
        el.removeChild(hand);
    }

  el.classList.add('draggable')
  hand = document.createElement('div')
  hand.className = 'dragger';
  el.appendChild(hand);
  hand.addEventListener('mousedown', drag, false);

  function drag(e) {
    // let { width, height } = document.defaultView.getComputedStyle(el)
    w = e.clientX; //parseInt(width, 10)
    h = e.clientY; //parseInt(height, 10)
    el.classList.add('m-move')
    doc.addEventListener('mousemove', fn, false);
    doc.addEventListener('mouseup', stop, false);
  }

  function move(e) {
       movex(e);
        movey(e);
    }

  function movex(e) {
      el.style.left = (e.clientX-w) + 'px';
    }
  function movey(e) {
      el.style.top =  (e.clientY-h) + 'px';
    }

  function stop(e) {
    el.classList.remove('m-move');
    doc.removeEventListener('mousemove', fn, false);
    doc.removeEventListener('mouseup', stop, false);
  }

  return el;
}
